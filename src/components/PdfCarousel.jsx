import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker — must match pdfjs-dist version exactly
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// Build-time lookup: import every PDF in src/assets/pdfs/ as a URL.
// Keys look like "./Food_Apps.pdf" → value is the hashed asset URL.
const pdfModules = import.meta.glob("../assets/pdfs/*.pdf", {
  query: "?url",
  eager: true,
});

// Normalise into a simple { "Food_Apps.pdf": "/assets/Food_Apps-abc123.pdf" } map
const pdfMap = Object.fromEntries(
  Object.entries(pdfModules).map(([key, mod]) => {
    const filename = key.split("/").pop(); // "Food_Apps.pdf"
    return [filename, mod.default];
  })
);

export default function PdfCarousel({ pdfFile }) {
  const [numPages, setNumPages] = React.useState(null);
  const [pdfData, setPdfData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [pageWidth, setPageWidth] = React.useState(600);

  // Memoize the file object so react-pdf doesn't see a new reference every render
  const fileObj = React.useMemo(() => (pdfData ? { data: new Uint8Array(pdfData) } : null), [pdfData]);

  // Resolve the build-time URL for the requested PDF, then fetch it.
  React.useEffect(() => {
    setLoading(true);
    setError(null);
    setNumPages(null);
    setPdfData(null);

    const resolvedUrl = pdfMap[pdfFile];

    if (!resolvedUrl) {
      setError(`PDF "${pdfFile}" not found in the asset map. Available: ${Object.keys(pdfMap).join(", ")}`);
      setLoading(false);
      return;
    }

    fetch(resolvedUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`PDF fetch failed: ${pdfFile} (HTTP ${res.status})`);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        // Copy the buffer so pdfjs worker can transfer it without "detached" errors
        setPdfData(buffer.slice(0));
        setLoading(false);
      })
      .catch((err) => {
        console.error("PDF fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [pdfFile]);

  // Responsive page width
  React.useEffect(() => {
    const update = () => setPageWidth(Math.min(window.innerWidth * 0.75, 700));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "rgba(255,255,255,0.5)" }}>
        Loading PDF slides...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#f87171" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 16px" }}>
      <Document
        file={fileObj}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(err) => {
          console.error("PDF load error:", err);
          setError(String(err?.message || err));
        }}
        loading={null}
      >
        {numPages && (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            centeredSlides
            style={{ paddingBottom: "48px" }}
          >
            {Array.from({ length: numPages }, (_, i) => (
              <SwiperSlide key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "16px",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Page
                    pageNumber={i + 1}
                    width={pageWidth}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                  />
                </div>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "12px",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.85rem",
                  }}
                >
                  {i + 1} / {numPages}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Document>
    </div>
  );
}
