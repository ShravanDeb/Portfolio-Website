"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export interface GlobeLocation {
  name: string;
  shortName: string;
  lat: number;
  lon: number;
  countryCode: string;
}

interface GlobeProps {
  className?: string;
  locations: GlobeLocation[];
  activeLocation: GlobeLocation;
  onLocationChange: (loc: GlobeLocation) => void;
}

function latLonToVector3(lat: number, lon: number, radius: number, altitude = 0): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const r = radius + altitude;
  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function Globe({
  className = "",
  locations,
  activeLocation,
  onLocationChange,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const prevLocationRef = useRef<GlobeLocation>(activeLocation);
  const arcsGroupRef = useRef<THREE.Group | null>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 260;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const sphereGeo = new THREE.SphereGeometry(100, 48, 48);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x18181b,
      transparent: true,
      opacity: 0.9,
    });
    globeGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(100.2, 24, 24));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x3f3f46,
      transparent: true,
      opacity: 0.35,
    });
    globeGroup.add(new THREE.LineSegments(wireGeo, wireMat));

    const arcsGroup = new THREE.Group();
    arcsGroupRef.current = arcsGroup;
    globeGroup.add(arcsGroup);

    const rings: THREE.Mesh[] = [];
    locations.forEach((loc) => {
      const pos = latLonToVector3(loc.lat, loc.lon, 100.8);

      const dotGeo = new THREE.SphereGeometry(2.2, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(pos);
      globeGroup.add(dotMesh);

      const ringGeo = new THREE.RingGeometry(3.5, 4.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: loc.shortName === activeLocation.shortName ? 0.8 : 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ringMesh);
      rings.push(ringMesh);
    });
    ringsRef.current = rings;

    const initialLonRad = -(activeLocation.lon * (Math.PI / 180)) - Math.PI / 2;
    const initialLatRad = activeLocation.lat * (Math.PI / 180);
    globeGroup.rotation.y = initialLonRad;
    globeGroup.rotation.x = initialLatRad;

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotVelX = 0;
    let rotVelY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      rotVelX = 0;
      rotVelY = 0;
      renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      globeGroup.rotation.y += dx * 0.005;
      globeGroup.rotation.x += dy * 0.005;
      globeGroup.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globeGroup.rotation.x));
      rotVelX = dy * 0.005;
      rotVelY = dx * 0.005;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        globeGroup.rotation.y += 0.002;
        rotVelX *= 0.95;
        rotVelY *= 0.95;
        globeGroup.rotation.x += rotVelX;
        globeGroup.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globeGroup.rotation.x));
        globeGroup.rotation.y += rotVelY;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!globeGroupRef.current || !arcsGroupRef.current) return;

    if (prevLocationRef.current.shortName !== activeLocation.shortName) {
      const startLoc = prevLocationRef.current;
      const endLoc = activeLocation;

      const vStart = latLonToVector3(startLoc.lat, startLoc.lon, 100.5);
      const vEnd = latLonToVector3(endLoc.lat, endLoc.lon, 100.5);

      const distance = vStart.distanceTo(vEnd);
      const midpoint = vStart.clone().add(vEnd).multiplyScalar(0.5);
      const altitude = distance * 0.45;
      midpoint.normalize().multiplyScalar(100 + altitude);

      const curve = new THREE.QuadraticBezierCurve3(vStart, midpoint, vEnd);
      const points = curve.getPoints(60);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);

      const arcMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 2,
        transparent: true,
        opacity: 0.9,
      });

      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroupRef.current.add(arcLine);

      arcsGroupRef.current.children.forEach((child) => {
        if (child !== arcLine && child instanceof THREE.Line) {
          gsap.to(child.material, { opacity: 0.15, duration: 1 });
        }
      });

      arcGeo.setDrawRange(0, 0);
      const drawProgress = { count: 0 };
      gsap.to(drawProgress, {
        count: 60,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => {
          arcGeo.setDrawRange(0, Math.round(drawProgress.count));
        },
      });

      const targetLonRad = -(endLoc.lon * (Math.PI / 180)) - Math.PI / 2;
      const targetLatRad = endLoc.lat * (Math.PI / 180);

      gsap.to(globeGroupRef.current.rotation, {
        y: targetLonRad,
        x: targetLatRad,
        duration: 1.4,
        ease: "power3.inOut",
      });

      ringsRef.current.forEach((ring, idx) => {
        const mat = ring.material as THREE.MeshBasicMaterial;
        const isActive = locations[idx]?.shortName === endLoc.shortName;
        gsap.to(mat, { opacity: isActive ? 0.8 : 0.2, duration: 0.8, ease: "power2.out" });
      });

      prevLocationRef.current = activeLocation;
    }
  }, [activeLocation, locations]);

  return <div ref={containerRef} className={`relative w-full aspect-square ${className}`} />;
}
