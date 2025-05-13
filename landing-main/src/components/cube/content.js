"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RubiksCube from "./RubiksCube";
import { useState } from "react";
import * as THREE from "three";
import "./Cube.css"
import "./timer.css"
import Timer from "./timer";

export default function CubeGame() {
  const [currentMove, setCurrentMove] = useState(null);
  const [isScrambling, setIsScrambling] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [enableOrbitControls, setEnableOrbitControls] = useState(true);

  return (
    <div className="container">
      <div className="canvas-container">
        <div className="canvas-wrapper">
          <Canvas
            camera={{
              position: [6, 6, 6],
              fov: 40,
              near: 0.1,
              far: 1000,
            }}
            gl={{
              antialias: true,
              toneMapping: THREE.NoToneMapping,
              outputColorSpace: "srgb",
              preserveDrawingBuffer: true,
            }}
            className="canvas"
          >
            <RubiksCube
              currentMove={currentMove}
              isScrambling={isScrambling}
              isResetting={isResetting}
              onScrambleComplete={() => {
                setIsScrambling(false);
                setCurrentMove(null);
              }}
              onResetComplete={() => {
                setIsResetting(false);
                setCurrentMove(null);
              }}
              setEnableOrbitControls={setEnableOrbitControls}
            />
            <OrbitControls
              makeDefault
              enablePan={false}
              enableZoom={false}
              enableRotate={enableOrbitControls}
              minDistance={8}
              maxDistance={8}
              enableDamping={true}
              dampingFactor={0.05}
              mouseButtons={{
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: null,
                RIGHT: null,
              }}
              touches={{
                ONE: THREE.TOUCH.ROTATE,
                TWO: null,
              }}
            />
          </Canvas>
        </div>
      </div>

        <div className="buttons-container">
            <div className="button-wrapper">
                <button
                    className="button scramble"
                    onClick={() => setIsScrambling(true)}
                    disabled={isScrambling || isResetting || currentMove !== null}
                >
                    Перемешка
                </button>
                <button
                    className="button reset"
                    onClick={() => setIsResetting(true)}
                    disabled={isScrambling || isResetting || currentMove !== null}
                >
                    Вернуть в собранное положение
                </button>
            </div>
            <div className="Timer">
                <Timer/>
            </div>
        </div>

    </div>
  );
}
