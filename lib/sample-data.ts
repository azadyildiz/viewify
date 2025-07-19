// --- STATIC SAMPLE DATA ---

export function getSampleXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<products>\n`;
  for (let i = 1; i <= 100; i++) {
    xml += `  <product>\n`;
    xml += `    <id>${i}</id>\n`;
    xml += `    <title>Sample Product ${i}</title>\n`;
    xml += `    <description>Sample product ${i} description.</description>\n`;
    xml += `    <price>${(10 + i).toFixed(2)}</price>\n`;
    xml += `    <discount>${i % 10}</discount>\n`;
    xml += `    <category>${i % 2 === 0 ? "Books" : "Electronics"}</category>\n`;
    xml += `    <brand>SampleBrand</brand>\n`;
    xml += `    <stock>${i * 2}</stock>\n`;
    xml += `    <rating>${(3.5 + (i % 15) * 0.1).toFixed(1)}</rating>\n`;
    xml += `    <reviews>${i * 3}</reviews>\n`;
    xml += `    <specifications>\n`;
    xml += `      <weight>${(0.5 + i * 0.01).toFixed(2)} kg</weight>\n`;
    xml += `      <dimensions>${10 + i}x${15 + i}x${2 + (i % 5)} cm</dimensions>\n`;
    xml += `      <color>${i % 2 === 0 ? "Blue" : "Black"}</color>\n`;
    xml += `      <material>${i % 2 === 0 ? "Paper" : "Plastic"}</material>\n`;
    xml += `    </specifications>\n`;
    xml += `    <shipping>\n`;
    xml += `      <free>${i % 2 === 0 ? "true" : "false"}</free>\n`;
    xml += `      <estimated_days>${3 + (i % 5)}</estimated_days>\n`;
    xml += `    </shipping>\n`;
    xml += `    <images>\n`;
    xml += `      <main>https://example.com/products/${i}/main.jpg</main>\n`;
    xml += `      <thumbnail>https://example.com/products/${i}/thumb.jpg</thumbnail>\n`;
    xml += `    </images>\n`;
    xml += `    <created_at>2023-01-${(i % 28 + 1).toString().padStart(2, "0")}</created_at>\n`;
    xml += `    <updated_at>2023-02-${(i % 28 + 1).toString().padStart(2, "0")}</updated_at>\n`;
    xml += `  </product>\n`;
  }
  xml += `</products>`;
  return xml;
}

export function getSampleJson(): string {
  const products = [];
  for (let i = 1; i <= 100; i++) {
    products.push({
      id: String(i),
      title: `Sample Product ${i}`,
      description: `Sample product ${i} description.`,
      price: 10 + i,
      discount: i % 10,
      category: i % 2 === 0 ? "Books" : "Electronics",
      brand: "SampleBrand",
      stock: i * 2,
      rating: +(3.5 + (i % 15) * 0.1).toFixed(1),
      reviews: i * 3,
      specifications: {
        weight: `${(0.5 + i * 0.01).toFixed(2)} kg`,
        dimensions: `${10 + i}x${15 + i}x${2 + (i % 5)} cm`,
        color: i % 2 === 0 ? "Blue" : "Black",
        material: i % 2 === 0 ? "Paper" : "Plastic"
      },
      shipping: {
        free: i % 2 === 0,
        estimated_days: 3 + (i % 5)
      },
      images: {
        main: `https://example.com/products/${i}/main.jpg`,
        thumbnail: `https://example.com/products/${i}/thumb.jpg`
      },
      created_at: `2023-01-${(i % 28 + 1).toString().padStart(2, "0")}`,
      updated_at: `2023-02-${(i % 28 + 1).toString().padStart(2, "0")}`
    });
  }
  return JSON.stringify({ products: { product: products } }, null, 2);
}

export function getSampleCsv(): string {
  let csv = "id,title,description,price,discount,category,brand,stock,rating,reviews,weight,dimensions,color,material,free_shipping,estimated_days,main_image,thumbnail,created_at,updated_at\n";
  for (let i = 1; i <= 100; i++) {
    csv += [
      i,
      `"Sample Product ${i}"`,
      `"Sample product ${i} description."`,
      (10 + i).toFixed(2),
      i % 10,
      i % 2 === 0 ? "Books" : "Electronics",
      "SampleBrand",
      i * 2,
      (3.5 + (i % 15) * 0.1).toFixed(1),
      i * 3,
      `"${(0.5 + i * 0.01).toFixed(2)} kg"`,
      `"${10 + i}x${15 + i}x${2 + (i % 5)} cm"`,
      i % 2 === 0 ? "Blue" : "Black",
      i % 2 === 0 ? "Paper" : "Plastic",
      i % 2 === 0 ? "true" : "false",
      3 + (i % 5),
      `https://example.com/products/${i}/main.jpg`,
      `https://example.com/products/${i}/thumb.jpg`,
      `2023-01-${(i % 28 + 1).toString().padStart(2, "0")}`,
      `2023-02-${(i % 28 + 1).toString().padStart(2, "0")}`
    ].join(",") + "\n";
  }
  return csv;
}