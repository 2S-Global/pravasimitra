"use client";
export default function Loader() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <img
        src="/assets/images/logo/Logo 7.png"
        alt="Loading..."
        style={{
          width: "80px",
          height: "80px",
          animation: "spin 1s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
