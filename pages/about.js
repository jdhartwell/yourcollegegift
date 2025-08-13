// pages/about.js
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout title="About | YourCollegeGift.com" description="Learn more about YourCollegeGift.com, an affiliate website recommending college gift ideas.">
      <div className="prose max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">About</h1>
        <p className="mt-4 text-black/70">
          YourCollegeGift.com curates the best college gift ideas and official team gear.
          We partner with Fanatics to surface quality, licensed products. When you buy through our links,
          we may earn a commission. Thanks for supporting our work!
        </p>
      </div>
    </Layout>
  );
}