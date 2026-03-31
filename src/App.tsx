import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Settings, 
  Target, 
  CheckCircle2, 
  Mail, 
  Star, 
  ArrowRight, 
  Menu, 
  X, 
  ShoppingCart, 
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Info,
  Package,
  Truck,
  Lock
} from 'lucide-react';
import { PRODUCTS, Product } from './constants';
import { getTacticalAdvice } from './services/geminiService';

// --- Components ---

const Navbar = ({ onNavigate, cartCount }: { onNavigate: (page: string, productId?: string) => void, cartCount: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Target className="w-8 h-8 text-tactical-red mr-2" />
            <span className="font-display text-xl font-bold tracking-tighter">REDNECK AMMUNITION</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-tactical-red transition-colors">HOME</button>
            <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-tactical-red transition-colors">PRODUCTS</button>
            <button className="text-sm font-medium hover:text-tactical-red transition-colors">ABOUT</button>
            <button 
              onClick={() => onNavigate('cart')}
              className="relative p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-tactical-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <button 
              onClick={() => onNavigate('cart')}
              className="relative p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-tactical-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-tactical-gray border-t border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg font-display">HOME</button>
              <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="block w-full text-left py-2 text-lg font-display">PRODUCTS</button>
              <button className="block w-full text-left py-2 text-lg font-display">ABOUT</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (page: string, productId?: string) => void }) => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/seed/tactical-bg/1920/1080?blur=2" 
        alt="Tactical Background" 
        className="w-full h-full object-cover opacity-30"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-tactical-black/80 via-transparent to-tactical-black"></div>
    </div>

    <div className="relative z-10 text-center px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
          PRECISION <span className="text-tactical-red">ENGINEERED.</span><br />
          BUILT FOR PERFORMANCE.
        </h1>
        <p className="text-lg md:text-xl text-tactical-accent/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          American-made firearm components and accessories designed for reliability when it matters most. Engineered with advanced manufacturing and tested in real-world conditions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate('home')} 
            className="tactical-button tactical-button-primary w-full sm:w-auto"
          >
            Shop Now
          </button>
          <button className="tactical-button tactical-button-secondary w-full sm:w-auto">
            View Products
          </button>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-6 h-6 opacity-50" />
    </div>
  </section>
);

const TrustBar = () => (
  <div className="bg-tactical-gray py-6 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
      {[
        { icon: Shield, text: "Made in USA" },
        { icon: Settings, text: "FFL Licensed Manufacturer" },
        { icon: Target, text: "Engineered for Performance" },
        { icon: Lock, text: "Secure Checkout" }
      ].map((item, i) => (
        <div key={i} className="flex items-center space-x-2 text-xs md:text-sm font-bold uppercase tracking-widest text-tactical-accent/60">
          <item.icon className="w-4 h-4 text-tactical-red" />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProductCard = ({ product, onNavigate }: { product: Product, onNavigate: (page: string, productId?: string) => void }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-panel group cursor-pointer overflow-hidden"
    onClick={() => onNavigate('product', product.id)}
  >
    <div className="aspect-square overflow-hidden relative">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-tactical-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">
        New Arrival
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl mb-1 group-hover:text-tactical-red transition-colors">{product.name}</h3>
      <p className="text-sm text-tactical-accent/50 mb-4">{product.benefit}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-mono font-bold">${product.price.toFixed(2)}</span>
        <button className="text-tactical-red flex items-center text-sm font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
          Shop Now <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; parts: { text: string }[] }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const advice = await getTacticalAdvice(input, messages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: advice }] }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel w-80 md:w-96 h-[500px] mb-4 flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="bg-tactical-red p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-white" />
                <span className="font-display font-bold text-white uppercase tracking-wider">Tactical Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="text-white w-5 h-5" /></button>
            </div>
            
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-tactical-black/50">
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <Target className="w-12 h-12 text-tactical-red mx-auto mb-4 opacity-20" />
                  <p className="text-sm text-tactical-accent/40">Ask about our precision components or technical specs.</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-tactical-red text-white' : 'bg-tactical-gray text-tactical-accent border border-white/10'}`}>
                    {m.parts[0].text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-tactical-gray p-3 rounded-lg text-sm animate-pulse">Analyzing...</div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-tactical-gray">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your query..."
                  className="flex-1 bg-tactical-black border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-tactical-red"
                />
                <button 
                  onClick={handleSend}
                  className="bg-tactical-red p-2 rounded hover:bg-red-700 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-tactical-red w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <MessageSquare className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

// --- Pages ---

const HomePage = ({ onNavigate }: { onNavigate: (page: string, productId?: string) => void }) => {
  return (
    <div className="space-y-24 pb-24">
      <Hero onNavigate={onNavigate} />
      <TrustBar />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 uppercase tracking-tighter">Built for Real-World Performance</h2>
          <p className="text-tactical-accent/50 max-w-xl mx-auto">Our most trusted components—designed for strength, precision, and reliability.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map(p => (
            <div key={p.id}>
              <ProductCard product={p} onNavigate={onNavigate} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-tactical-gray py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">NOT JUST PARTS.<br /><span className="text-tactical-red">ENGINEERED SOLUTIONS.</span></h2>
            <p className="text-lg text-tactical-accent/70 mb-8 leading-relaxed">
              Most aftermarket firearm accessories are mass-produced with little attention to real-world performance. At Redneck Ammunition LLC, every product is designed with engineering precision and built using advanced manufacturing techniques—including additive processes—to deliver durability, reliability, and performance you can trust.
            </p>
            <ul className="space-y-4">
              {[
                "Designed by experienced manufacturing professionals",
                "Built using advanced additive and precision processes",
                "Tested for durability under real conditions",
                "Small-batch production for quality control"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-tactical-red" />
                  <span className="font-bold text-sm uppercase tracking-wider">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/engineering/800/600" 
              alt="Engineering" 
              className="rounded-lg shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 glass-panel p-6 hidden md:block">
              <div className="flex items-center space-x-4">
                <Settings className="w-10 h-10 text-tactical-red" />
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-50">Precision Tested</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="glass-panel p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Mail className="w-24 h-24" />
          </div>
          <h2 className="text-3xl md:text-4xl mb-4">GET 10% OFF YOUR FIRST ORDER</h2>
          <p className="text-tactical-accent/50 mb-8">Join our community and get exclusive access to new product drops, updates, and special offers.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              className="flex-1 bg-tactical-black border border-white/10 px-6 py-3 rounded focus:outline-none focus:border-tactical-red"
            />
            <button className="tactical-button tactical-button-primary">Join</button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-center mb-16 uppercase tracking-widest">Trusted by Builders Who Demand Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text: "Solid build quality. Locks up tight and performs exactly how it should.", author: "Mike R." },
            { text: "You can tell this was designed by someone who actually understands firearms.", author: "Sarah T." },
            { text: "Lightweight, durable, and clean design. Will be buying more.", author: "James K." }
          ].map((rev, i) => (
            <div key={i} className="glass-panel p-8">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-tactical-red text-tactical-red" />)}
              </div>
              <p className="italic text-tactical-accent/70 mb-6 font-display">"{rev.text}"</p>
              <div className="font-bold text-sm uppercase tracking-widest">— {rev.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-tactical-red py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl mb-6 text-white">UPGRADE YOUR SETUP TODAY</h2>
          <p className="text-white/80 mb-10 text-lg">Precision components. Reliable performance. No compromises.</p>
          <button className="tactical-button bg-white text-tactical-red hover:bg-tactical-accent">Shop Now</button>
        </div>
      </section>
    </div>
  );
};

const ProductPage = ({ productId, onAddToCart }: { productId: string, onAddToCart: () => void }) => {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square glass-panel overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square glass-panel overflow-hidden cursor-pointer hover:border-tactical-red">
                <img 
                  src={`https://picsum.photos/seed/tactical-${i}/400/400`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl mb-2">{product.name}</h1>
            <p className="text-tactical-red font-bold uppercase tracking-widest text-sm mb-4">{product.benefit}</p>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-mono font-bold">${product.price.toFixed(2)}</span>
              <div className="flex items-center space-x-1 text-tactical-red">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                <span className="text-xs text-tactical-accent/50 ml-2">(12 Reviews)</span>
              </div>
            </div>
            <p className="text-tactical-accent/70 leading-relaxed mb-8">
              Improve control, reduce fatigue, and upgrade your setup with a foregrip designed for real-world performance.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={onAddToCart}
                className="tactical-button tactical-button-primary flex items-center justify-center"
              >
                <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
              </button>
              <button className="tactical-button tactical-button-secondary">Buy Now</button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
               {[
                { icon: Truck, text: "Fast Shipping" },
                { icon: Shield, text: "Lifetime Warranty" },
                { icon: CheckCircle2, text: "FFL Compliant" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest opacity-50">
                  <item.icon className="w-3 h-3" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex space-x-8 mb-6 border-b border-white/5">
              {['description', 'specs', 'faq'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === tab ? 'text-tactical-red' : 'text-tactical-accent/40'}`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-tactical-red" />}
                </button>
              ))}
            </div>

            <div className="min-h-[200px]">
              {activeTab === 'description' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <p className="text-tactical-accent/70 leading-relaxed">{product.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-tactical-red mt-1 shrink-0" />
                        <span className="text-sm text-tactical-accent/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {activeTab === 'specs' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-2">
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-white/5 text-sm">
                      <span className="font-bold text-tactical-accent/40 uppercase tracking-wider">{key}</span>
                      <span className="font-mono">{val}</span>
                    </div>
                  ))}
                </motion.div>
              )}
              {activeTab === 'faq' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {[
                    { q: "Will this fit my rifle?", a: "This foregrip is compatible with all standard M-LOK rail systems." },
                    { q: "Is installation difficult?", a: "No. It installs easily using standard M-LOK hardware." },
                    { q: "What material is it made from?", a: "It is manufactured using high-strength materials designed for durability and long-term use." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="font-bold flex items-center space-x-2">
                        <Info className="w-4 h-4 text-tactical-red" />
                        <span>{item.q}</span>
                      </div>
                      <p className="text-sm text-tactical-accent/50 ml-6">{item.a}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upsell */}
      <section className="mt-32">
        <h2 className="text-3xl mb-12 uppercase tracking-tighter">Complete Your Setup</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.filter(p => p.id !== productId).map(p => (
            <div key={p.id} className="glass-panel p-6 flex items-center space-x-6 cursor-pointer hover:bg-white/5 transition-colors">
              <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-bold uppercase tracking-wider text-sm">{p.name}</h4>
                <p className="text-xs text-tactical-accent/40 mb-2">${p.price.toFixed(2)}</p>
                <button className="text-[10px] font-bold text-tactical-red uppercase tracking-widest">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-tactical-black border-t border-white/5 py-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center mb-6">
          <Target className="w-8 h-8 text-tactical-red mr-2" />
          <span className="font-display text-xl font-bold tracking-tighter">REDNECK AMMUNITION</span>
        </div>
        <p className="text-tactical-accent/40 max-w-md leading-relaxed mb-8">
          Precision engineered firearm components and accessories designed for reliability when it matters most. American-made and tested in real-world conditions.
        </p>
        <div className="flex space-x-6 text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>YouTube</span>
        </div>
      </div>
      <div>
        <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Quick Links</h4>
        <ul className="space-y-4 text-sm text-tactical-accent/60">
          <li><a href="#" className="hover:text-tactical-red">Shop All</a></li>
          <li><a href="#" className="hover:text-tactical-red">New Arrivals</a></li>
          <li><a href="#" className="hover:text-tactical-red">Technical Specs</a></li>
          <li><a href="#" className="hover:text-tactical-red">About Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Support</h4>
        <ul className="space-y-4 text-sm text-tactical-accent/60">
          <li><a href="#" className="hover:text-tactical-red">Contact Us</a></li>
          <li><a href="#" className="hover:text-tactical-red">Shipping Policy</a></li>
          <li><a href="#" className="hover:text-tactical-red">Returns & Exchanges</a></li>
          <li><a href="#" className="hover:text-tactical-red">FAQ</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
      <div className="text-[10px] uppercase tracking-widest opacity-30">© 2026 Redneck Ammunition LLC. All Rights Reserved.</div>
      <div className="flex space-x-6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-20" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-20" />
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (page: string, productId?: string) => {
    if (page === 'cart') {
      setIsCartOpen(true);
      return;
    }
    setCurrentPage(page);
    if (productId) setSelectedProductId(productId);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} cartCount={cartCount} />
      
      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-tactical-gray z-[70] shadow-2xl p-8 border-l border-white/10"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-display uppercase tracking-widest">Your Arsenal</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              
              {cartCount === 0 ? (
                <div className="text-center py-20 opacity-30">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
                  <p className="uppercase tracking-widest font-bold">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 glass-panel p-4">
                    <img src={PRODUCTS[0].image} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-bold uppercase text-sm">{PRODUCTS[0].name}</h4>
                      <p className="text-xs opacity-50">${PRODUCTS[0].price.toFixed(2)}</p>
                    </div>
                    <div className="font-mono">x{cartCount}</div>
                  </div>
                  
                  <div className="pt-8 border-t border-white/10">
                    <div className="flex justify-between mb-4">
                      <span className="uppercase tracking-widest opacity-50">Subtotal</span>
                      <span className="font-mono text-xl">${(PRODUCTS[0].price * cartCount).toFixed(2)}</span>
                    </div>
                    <button className="tactical-button tactical-button-primary w-full">Proceed to Checkout</button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomePage onNavigate={handleNavigate} />
            </motion.div>
          ) : (
            <motion.div
              key="product"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductPage 
                productId={selectedProductId || PRODUCTS[0].id} 
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
