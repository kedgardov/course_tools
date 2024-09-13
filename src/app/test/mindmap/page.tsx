'use client'; // This enables client-side rendering for Next.js

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Input Data
const coursesData = [
  { curso: 'Microbiología y sanidad de los alimentos', opcionTerminal: 'Microbiología', nivelCurricular: 'Introductorio' },
  { curso: 'Evaluación cuantitativa del riesgo microbiológico', opcionTerminal: 'Microbiología', nivelCurricular: 'Acentuación' },
  { curso: 'Biología y ecología de bacteriófagos', opcionTerminal: 'Microbiología', nivelCurricular: 'Acentuación' },
  { curso: 'Métodos de análisis bacteriológico en sistemas acuáticos', opcionTerminal: 'Microbiología', nivelCurricular: 'Profundización' },
];

// Define nodes for Nivel Curricular
const nivelesCurriculares = ['Básico', 'Introductorio', 'Acentuación', 'Profundización'];

// Initialize nodes and edges arrays
const initialNodes = [];
const initialEdges = [];

// Create the parent node for Opcion Terminal
const opcionTerminalNode = {
  id: 'ot-1',
  data: { label: <button onClick={() => alert('Clicked Opcion Terminal')}>Microbiología</button> },
  position: { x: 250, y: 0 },
};
initialNodes.push(opcionTerminalNode);

// Create nodes for each Nivel Curricular and connect them to the Opcion Terminal node
nivelesCurriculares.forEach((nivel, index) => {
  const nivelNode = {
    id: `nc-${index + 1}`,
    data: { label: <button onClick={() => alert(`Clicked ${nivel}`)}>{nivel}</button> },
    position: { x: 100 * (index + 1), y: 100 },
  };
  initialNodes.push(nivelNode);
  initialEdges.push({ id: `e-ot-${nivelNode.id}`, source: opcionTerminalNode.id, target: nivelNode.id });
});

// Create course nodes and connect them to their corresponding Nivel Curricular nodes
coursesData.forEach((course, index) => {
  const nivelNode = initialNodes.find((node) => node.data.label.props.children === course.nivelCurricular);
  if (nivelNode) {
    const courseNode = {
      id: `course-${index + 1}`,
      data: { label: <button onClick={() => alert(`Clicked ${course.curso}`)}>{course.curso}</button> },
      position: { x: nivelNode.position.x + 150, y: nivelNode.position.y + 100 * (index + 1) },
    };
    initialNodes.push(courseNode);
    initialEdges.push({ id: `e-${nivelNode.id}-${courseNode.id}`, source: nivelNode.id, target: courseNode.id });
  }
});

const MindMapComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ height: '90vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default MindMapComponent;
