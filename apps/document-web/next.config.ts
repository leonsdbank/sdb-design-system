import { createMDX } from "fumadocs-mdx/next";
import { withSdbUI, type NextConfig } from "@sdb/ui/next";

const withMDX = createMDX();

export default withSdbUI(withMDX({}) as NextConfig);
