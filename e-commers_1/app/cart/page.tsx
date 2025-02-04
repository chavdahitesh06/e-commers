"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [step, setStep] = useState("cart"); // "cart" -> "address" -> "payment"
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: ""
  });
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
    const savedAddresses = JSON.parse(localStorage.getItem("addresses") || "[]");
    setAddresses(savedAddresses);
  }, []);

  const handleNext = () => {
    if (step === "cart") setStep("address");
    else if (step === "address" && selectedAddress !== null) setStep("payment");
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const validateAndSaveAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.pincode || !newAddress.address || !newAddress.locality || !newAddress.city || !newAddress.state) {
      setError("Please fill all the fields correctly.");
      return;
    }
    setError("");
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setUseNewAddress(false);
  };

  const removeAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const removeCartItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {step === "cart" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {cartItems.length === 0 ? (
            <div>Your cart is empty!</div>
          ) : (
            <div className="grid gap-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded" />
                      <div>
                        <CardTitle>{item.title}</CardTitle>
                        <div>Size: {item.size}</div>
                        <div>Color: {item.color}</div>
                        <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
                      <Button variant="ghost" size="icon" onClick={() => removeCartItem(item.id)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex items-center justify-between mt-4">
                <div className="text-xl font-semibold">Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</div>
                <Button onClick={handleNext}>
                  <ShoppingCart className="w-5 h-5" /> Checkout
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {step === "address" && (
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} className="space-y-4">
          <h2 className="text-xl font-semibold">Select Address</h2>
          {addresses.map((addr, index) => (
            <Card key={index} className={`p-4 border rounded-lg shadow-md transition-transform transform hover:scale-105 ${selectedAddress === index ? 'border-blue-500' : ''}`} onClick={() => setSelectedAddress(index)}>
              <CardContent>
                <p>{addr.name}, {addr.phone}</p>
                <p>{addr.address}, {addr.locality}</p>
                <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                <Button variant="ghost" size="icon" onClick={(e) => {e.stopPropagation(); removeAddress(index);}}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button onClick={() => setUseNewAddress(true)}>
            <PlusCircle className="w-5 h-5" /> Add New Address
          </Button>
          {useNewAddress && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 border rounded-lg shadow-md">
              <input type="text" name="name" placeholder="Full Name" className="border p-2 w-full rounded-md" onChange={handleAddressChange} />
              <input type="text" name="phone" placeholder="Mobile Number" className="border p-2 w-full rounded-md" onChange={handleAddressChange} />
              {error && <p className="text-red-500">{error}</p>}
              <Button onClick={validateAndSaveAddress} className="mt-2 w-full">Save Address</Button>
            </motion.div>
          )}
          <Button onClick={handleNext} className="w-full" disabled={selectedAddress === null}>Proceed to Payment</Button>
        </motion.div>
      )}
    </div>
  );
}
