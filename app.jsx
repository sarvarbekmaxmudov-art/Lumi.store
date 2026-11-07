
import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "iPhone 11 Pro",
    category: "Telefonlar",
    price: 1199,
    oldPrice: 1299,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",
    description: "Titanium. Kuchli. Mukammal."
  },
  {
    id: 2,
    name: "MacBook Pro",
    category: "Noutbuklar",
    price: 1999,
    oldPrice: 2199,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700",
    description: "Professional darajadagi quvvat."
  },
  {
    id: 3,
    name: "AirPods Pro",
    category: "Aksessuarlar",
    price: 249,
    oldPrice: 279,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=700",
    description: "Ovozning yangi darajasi."
  },
  {
    id: 4,
    name: "Apple Watch",
    category: "Aksessuarlar",
    price: 399,
    oldPrice: 449,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700",
    description: "Har bir lahza nazoratingizda."
  },
  {
    id: 5,
    name: "iPad Pro",
    category: "Planshetlar",
    price: 899,
    oldPrice: 999,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=700",
    description: "Tasavvuringizga chegara yo‘q."
  },
  {
    id: 6,
    name: "MacBook Air",
    category: "Noutbuklar",
    price: 1099,
    oldPrice: 1199,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
    description: "Yengillik va quvvat."
  }
];

const money = (price) =>
  "$" + price.toLocaleString("en-US");

function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState("Barchasi");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const categories = [
    "Barchasi",
    "Telefonlar",
    "Noutbuklar",
    "Planshetlar",
    "Aksessuarlar"
  ];

  const filteredProducts = products.filter((p) =>
    (category === "Barchasi" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setNotice(product.name + " savatchaga qo‘shildi!");
    setTimeout(() => setNotice(""), 2200);
  };

  const changeQty = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + amount }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <div className="app">
      <div className="topbar">
        Bepul yetkazib berish — $100 dan yuqori xaridlarga
      </div>

      <header className="navbar">
        <a href="#" className="logo">lumi<span>.</span></a>

        <nav>
          <a href="#home">Bosh sahifa</a>
          <a href="#products">Mahsulotlar</a>
          <a href="#about">Biz haqimizda</a>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => setSearch((v) => v ? "" : " ")}
            aria-label="Qidirish"
          >
            ⌕
          </button>
          <button
            className="icon-btn"
            onClick={() => setCartOpen(true)}
            aria-label="Savatcha"
          >
            ♧ <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">YANGI AVLOD TEXNOLOGIYASI</span>
            <h1>Kelajakni<br />his qiling<span>.</span></h1>
            <p>
              Siz uchun eng zamonaviy texnologiyalar.
              Sifat, dizayn va mukammallik bir joyda.
            </p>
            <a href="#products" className="primary-btn">
              Xarid qilish <span>↗</span>
            </a>
            <div className="hero-note">
              <span>✦</span> Premium sifat. Ishonchli xizmat.
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1100"
              alt="Premium smartfon"
            />
            <div className="floating-card">
              <span>NEW COLLECTION</span>
              <strong>Technology<br />reimagined.</strong>
            </div>
          </div>
        </section>

        <section className="features">
          <div><span>✦</span><strong>Premium sifat</strong><small>Har bir mahsulotda</small></div>
          <div><span>↗</span><strong>Tez yetkazish</strong><small>O‘zbekiston bo‘ylab</small></div>
          <div><span>♡</span><strong>Ishonchli xizmat</strong><small>Mijozlar biz uchun muhim</small></div>
          <div><span>✓</span><strong>Kafolat</strong><small>Sifat kafolatlangan</small></div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">BIZNING TANLOV</span>
              <h2>Eng yaxshi mahsulotlar<span>.</span></h2>
              <p>Hayotingizni yanada qulay qiladigan texnologiyalar.</p>
            </div>
            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Mahsulot qidirish..."
              />
            </div>
          </div>

          <div className="categories">
            {categories.map((c) => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button
                    className={`favorite ${favorites.includes(product.id) ? "liked" : ""}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Sevimlilarga qo‘shish"
                  >
                    {favorites.includes(product.id) ? "♥" : "♡"}
                  </button>
                  {product.oldPrice && (
                    <span className="sale">SALE</span>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-bottom">
                    <div className="price">
                      <strong>{money(product.price)}</strong>
                      <del>{money(product.oldPrice)}</del>
                    </div>
                    <button
                      className="add-btn"
                      onClick={() => addToCart(product)}
                      aria-label="Savatchaga qo‘shish"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty">
              Mahsulot topilmadi. Boshqa nom bilan qidirib ko‘ring.
            </div>
          )}
        </section>

        <section className="banner" id="about">
          <div>
            <span className="eyebrow">LUMI STORE</span>
            <h2>Texnologiya —<br />bu san'at<span>.</span></h2>
            <p>Har bir detalda mukammallik. Har bir xaridda ishonch.</p>
            <a href="#products" className="light-btn">Kashf qilish ↗</a>
          </div>
          <div className="banner-decoration">L</div>
        </section>
      </main>

      <footer>
        <a href="#" className="logo">lumi<span>.</span></a>
        <p>© 2026 LUMI STORE. Barcha huquqlar himoyalangan.</p>
        <span>Made with care ✦</span>
      </footer>

      {notice && <div className="toast">✓ {notice}</div>}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Savatcha <span>({cartCount})</span></h2>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>♧</span>
                <h3>Savatchangiz bo‘sh</h3>
                <p>Mahsulot tanlang va xaridni boshlang.</p>
                <button className="primary-btn" onClick={() => setCartOpen(false)}>
                  Xarid qilish
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <strong>{money(item.price)}</strong>
                        <div className="quantity">
                          <button onClick={() => changeQty(item.id, -1)}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <button
                        className="remove"
                        onClick={() => changeQty(item.id, -item.qty)}
                      >✕</button>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="total">
                    <span>Jami:</span>
                    <strong>{money(total)}</strong>
                  </div>
                  <button
                    className="checkout-btn"
                    onClick={() => alert("Buyurtma berish uchun do‘kon egasi bilan bog‘laning.")}
                  >
                    Buyurtma berish →
                  </button>
                  <small>Yetkazib berish narxi alohida hisoblanadi.</small>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
