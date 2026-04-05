import { Calendar, ArrowRight } from "lucide-react";
import { API_ENDPOINTS, fetchApiData, normalizeLanguage } from "@/lib/api";
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
  const normalizedLang = normalizeLanguage(lang);

  let posts: Array<{
    blogId: number;
    title: string;
    excerpt: string;
    author: string;
    publishedAt: string;
  }> = [];

  try {
    const blogData = await fetchApiData<{ posts: typeof posts }>(API_ENDPOINTS.BLOGS, normalizedLang);
    posts = Array.isArray(blogData?.posts) ? blogData.posts : [];
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    return (
      <section 
        id="blog"
        className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background text-foreground z-10`}
      >
        <div className={`container mx-auto ${SPACING.container}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {copy.heading}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {copy.description}
            </p>
          </div>
          
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              {lang === 'ge' ? 'Keine Blog-Beiträge verfügbar.' : 'No blog posts available.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="blog"
      className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background text-foreground z-10`}
    >
      <div className={`container mx-auto ${SPACING.container}`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {copy.description}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post, index) => (
              <article
                key={post.blogId}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <a
                  href={localizedPath(lang as "en" | "ge", `/blog/${slugify(post.title)}`)}
                  className="group cursor-pointer block"
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
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href={localizedPath(lang as "en" | "ge", "/blog")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {copy.read}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
