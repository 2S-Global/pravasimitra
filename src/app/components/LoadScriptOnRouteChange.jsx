'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function LoadScriptOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    const scriptUrls = [
   //   '/assets/js/google-map.js',
      '/assets/js/modernizr-3.6.0.min.jss',
      '/assets/js/jquery.min.js',
      '/assets/js/popper.min.js',
    //  '/assets/js/bootstrap.min.js',
      '/assets/js/plugins.js',
      '/assets/js/main.js',
      '/assets/js/chart.min.js',
      '/assets/js/chart-active.js'
    ];

    const scripts = [];

    const loadScripts = () => {
      scriptUrls.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
        scripts.push(script);
      });
    };

    // Delay to ensure the DOM is fully settled
    setTimeout(loadScripts, 150); // Or use requestAnimationFrame

    return () => {
      scripts.forEach(script => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      });
    };
  }, [pathname]);

  return null;
}

export default LoadScriptOnRouteChange;
