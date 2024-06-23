"use client";

import React from "react";
import HeroSection from "@/components/welcome/Hero";
import FeaturesSection from "@/components/welcome/Features";
import Footer from "@/components/welcome/Footer";
import Header from "@/components/welcome/Header";
import Authors from "@/components/welcome/Authors";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Authors />
      <Footer />
    </div>
  );
};

export default LandingPage;
