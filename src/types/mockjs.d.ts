declare module 'mockjs' {
  const Mock: {
    mock: (url: string, type: string, callback: (options: any) => any) => void;
  };
  export default Mock;
} 