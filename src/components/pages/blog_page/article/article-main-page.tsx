"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Article } from '@/app/types/blog-articles.types'

type ArticleMainPageProps = {
    article: Article
}

interface BlogPageProps {
  title: string;
  description: string;
  date: string;
  blogImage: string;
  blogText: string;
}

const BlogPage: React.FC<BlogPageProps> = ({
  title,
  description,
  date,
  blogImage,
  blogText
}) => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div 
        className="flex flex-col items-center justify-center mb-16"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-4xl font-semibold text-gray-900 mb-4 leading-[44px]"
          variants={itemVariants}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-xl leading-[30px] text-gray-600 italic mb-6"
          variants={itemVariants}
        >
          {description}
        </motion.p>
        <motion.p 
          className="text-gray-500 text-sm leading-[30px]"
          variants={itemVariants}
        >
          {date}
        </motion.p>
      </motion.div>

      {/* Hero Image */}
      <motion.div 
        className="relative w-full h-[426px] md:h-[716px] mb-16"
        variants={imageVariants}
      >
        <Image 
          src={blogImage} 
          alt={title}
          className="w-full h-full object-cover rounded-[10px]"
          fill
          priority // optional: ensures it's not lazy-loaded (useful for hero/banner)
        />
      </motion.div>

      {/* Blog Content */}
      <motion.div 
        className=""
        variants={itemVariants}
      >
        <motion.div
          className="prose prose-lg max-w-none"
          variants={itemVariants}
          dangerouslySetInnerHTML={{ __html: blogText }}
          style={{
            lineHeight: '28px',
            fontSize: '1.1rem',
            color: '#535862'
          }}
        />
      </motion.div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </motion.button>

      <style jsx>{`
        
      `}</style>
    </motion.div>
  );
};

// Example usage component
const ArticleMainPage = ({ article }: ArticleMainPageProps) => {
  const sampleBlogText = `
    <p>Some people follow the rules. Others rewrite them. <strong>Falz?</strong> He flips the whole script, adds a beat, drops a verse, and still shows up to court in a suit if he has to. In a world where you're told to "stick to one thing," Falz is out here being everything; rapper, actor, lawyer, activist and doing it well. He's not playing roles. He's living layers. And somehow, they all align. We're told that being multi-talented can be messy. But Falz proves that versatility, when intentional, is <strong>POWER</strong>. Brains, creativity, and a killer brand don't just coexist; they feed each other. Falz demonstrates that intellect, artistry, and strategy can coexist in harmony, not just in theory, but also in practice.</p>

    <p>Born <em>Folarin Falana</em> in Mushin, Lagos, to renowned human rights lawyers Funmi and Femi Falana (SANs), Falz didn't just grow up around justice; he studied it. With a Law degree from the University of Reading and a call to the Nigerian Bar, he was well on track to join the family legacy. While he may not be clocking hours in court, his understanding of the law echoes through his music, activism, and public commentary. He uses that legal insight as a compass, navigating injustice, challenging power structures, and amplifying causes with precision. The degree might not hang in a courtroom, but it shows up every time he speaks truth to power.</p>

    <p>Falz burst onto the scene in 2009, and by the time "Marry Me" hit the airwaves, he was making us laugh, dance, and think. But he didn't stop at catchy tunes. He created music that resonated with social commentary, often disguised as satire, laced with Afrobeats and hip-hop. With his independent label, <strong>Bahd Guys Records</strong>, he became both the talent and the boss.</p>

    <p>Then came <em>"This Is Nigeria."</em> Inspired by Childish Gambino's "This Is America," Falz gave us a version that cut to the bone of Nigeria's reality: corruption, power abuse, and failed systems. Suddenly, Falz wasn't just entertaining. He was enlightening. He followed up with Moral Instruction, an album that doubled as a national conscience. Long before #EndSARS became a global cry, Falz was already calling out injustice. And when the protests erupted in 2020, he was at the forefront, not just as an artist, but as a citizen. <strong>Mobilizing celebrities. Calling out the government. Demanding justice.</strong> Even after the tragic end of the protests, he didn't go silent. He doubled down. "Johnny," one of the most powerful tributes to victims of police brutality, isn't just a song, it's a memorial. As Falz wrote: <em>"We will never forget the heroes that have been unlawfully slain... For every single Nigerian life snatched away unlawfully, we must make sure we get justice."</em></p>

    <blockquote>
      <p>"Through the 2023 elections and beyond, he's kept the same energy, dropping politically charged tracks like 'Yakubu,' challenging corruption and urging youth to participate in democracy."</p>
    </blockquote>

    <p>But what truly sets Falz apart isn't just the activism. It's the coherence of his brand. From humorous skits in faux accents to serious courtroom speeches to gritty movie roles across three worlds without losing his core. Whether he's cracking jokes in Jenifa's Diary or going full throttle in Brotherhood, he makes you ask: <strong>"Which version is the real him?"</strong></p>

    <p>The answer? <strong>All of them.</strong> Falz doesn't confuse versatility with inconsistency. He's proof that you can be everything if you're intentional about it. <em>So, what can we learn from Falz?</em> Your background isn't a barrier, it is a launchpad. Consistency isn't sameness, it's showing up differently with the same values. A personal brand isn't a costume, it is a character built, lived, and refined. Like we have said, Falz? One man! All three! No compromise!!</p>
  `;

  const { title, description, date, image } = article;

  return (
    <BlogPage
      title={title}
      description={description}
      date={date}
      blogImage={image}
      blogText={sampleBlogText}
    />
  );
};

export default ArticleMainPage;