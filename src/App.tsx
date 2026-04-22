export default function App() {
  const products = [
    {
      name: "Tactical Rail Protection",
      price: "$24.99",
      link: "PASTE_RAIL_COVER_LINK_HERE",
    },
    {
      name: "Low Profile Angled Grip",
      price: "$14.99",
      link: "PASTE_ANGLED_GRIP_LINK_HERE",
    },
    {
      name: "Quick Detach Sling Adapter",
      price: "$12.99",
      link: "PASTE_QD_SLING_LINK_HERE",
    },
    {
      name: "Tactical Rifle Stop",
      price: "$14.99",
      link: "PASTE_BARRICADE_STOP_LINK_HERE",
    },
    {
      name: "Rifle Wall Holder",
      price: "$16.99",
      link: "PASTE_WALL_MOUNT_LINK_HERE",
    },
    {
      name: "Rifle Stand",
      price: "$24.99",
      link: "PASTE_DISPLAY_STAND_LINK_HERE",
    },
    {
      name: "M-LOK Hand Stop",
      price: "$14.99",
      link: "PASTE_HAND_STOP_LINK_HERE",
    },
    {
      name: "Rail Covers",
      price: "$24.99",
      link: "PASTE_SECOND_RAIL_COVER_LINK_HERE",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 style={{ marginBottom: "10px" }}>Redneck Ammunition</h1>
          <p style={{ fontSize: "20px", margin: 0 }}>
            Built for performance. Designed for control.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.name}
              style={{
                background: "#1b1b1b",
                borderRadius: "12px",
                padding: "24px 20px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                 transition: "0.2s",
  cursor: "pointer"
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  marginTop: 0,
                  marginBottom: "14px",
                  lineHeight: 1.3,
                }}
              >
                {product.name}
              </h2>

              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "14px 24px",
                  background: "red",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                Buy Now – {product.price}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
