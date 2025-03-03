import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pencil, Trash2 } from 'lucide-react';

interface HandwritingCanvasProps {
  onSave: (dataUrl: string) => void;
  initialData?: string;
}

const HandwritingCanvas: React.FC<HandwritingCanvasProps> = ({ onSave, initialData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set initial styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    
    setContext(ctx);
    
    // Load initial data if provided
    if (initialData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = initialData;
    }
    
    // Handle resize
    const handleResize = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      // Save current drawing
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);
      
      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restore drawing
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.drawImage(tempCanvas, 0, 0);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [color, lineWidth, initialData]);
  
  // Drawing functions
  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get pointer position relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.beginPath();
    context.moveTo(x, y);
    
    setIsDrawing(true);
    
    // Capture pointer
    canvas.setPointerCapture(e.pointerId);
  };
  
  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get pointer position relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set styles based on tool
    if (tool === 'pen') {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = color;
    } else {
      context.globalCompositeOperation = 'destination-out';
      context.strokeStyle = 'rgba(255,255,255,1)';
    }
    
    context.lineTo(x, y);
    context.stroke();
  };
  
  const stopDrawing = () => {
    if (!isDrawing || !context) return;
    
    context.closePath();
    setIsDrawing(false);
    
    // Save canvas data
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    }
  };
  
  const clearCanvas = () => {
    if (!context) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    onSave('');
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 border-b border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-lg ${tool === 'pen' ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-lg ${tool === 'eraser' ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
          >
            <Eraser size={20} />
          </button>
          {tool === 'pen' && (
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer"
            />
          )}
        </div>
        <button
          onClick={clearCanvas}
          className="p-2 text-gray-500 hover:text-red-500"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="flex-1 bg-gray-50 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />
      </div>
    </div>
  );
};

export default HandwritingCanvas;