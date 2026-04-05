import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { fetchBlog } from "@/lib/api";
import { getCopy } from "@/lib/copy";
import { SPACING } from "@/lib/constants";
import { localizedPath } from "@/lib/site-config";

// Helper to create URL-friendly slug from title
const slugify = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .trim();
};

export async function Blog({ lang }: { lang: string }) {
  const copy = getCopy(lang, 'blog');
  const blogData = await fetchBlog(lang);
  
  const posts = blogData?.posts || [];

  if (posts.length === 0) {
    return (
      <motion.section 
        id="blog"
        className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background text-foreground z-10`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={`container mx-auto ${SPACING.container}`}>
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {copy.heading}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {copy.description}
            </p>
          </motion.div>
          
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              {lang === 'ge' ? 'Keine Blog-Beiträge verfügbar.' : 'No blog posts available.'}
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      id="blog"
      className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background text-foreground z-10`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={`container mx-auto ${SPACING.container}`}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {copy.description}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post, index) => (
              <motion.article
                key={post.blogId}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => window.location.href = localizedPath(lang as "en" | "ge", `/blog/${slugify(post.title)}`)}
              >
                <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-primary/20">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishedAt).toLocaleDateString(lang === 'ge' ? 'de-DE' : 'en-US')}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gold font-medium">
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-primary group-hover:text-gold transition-colors">
                      {copy.read}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={() => window.location.href = localizedPath(lang as "en" | "ge", "/blog")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {copy.read}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
