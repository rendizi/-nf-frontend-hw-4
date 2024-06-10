"use client"

import Navbar from "@/app/components/Navbar";
import {QueryClient, QueryClientProvider, useQueryClient} from "react-query";
import ProductsList from "@/app/components/ProductsList";
import './globals.css'

export default function Home() {

  return (
      <div>
        <Navbar />
        <ProductsList />
      </div>
  );
}


