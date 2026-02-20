import { ComponentShowcase } from "~/components/component-showcase";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold">@sdbank/ui Web Playground</h1>
      <p className="mb-10 text-gray-500">
        React Native components rendered on the web via react-native-web
      </p>
      <ComponentShowcase />
    </main>
  );
}
