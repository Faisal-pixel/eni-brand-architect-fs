# Things to note down in my notion

1. How to add a div with a background image and background overlay with gradient:

```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="relative w-full max-w-4xl overflow-hidden rounded-2xl group cursor-pointer"
>
  <div className="relative w-full h-[500px]">
    <Image
      src={imageUrl}
      alt="Design card background"
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-black/50 group-hover:via-black/30 transition duration-500"></div>
  </div>
</motion.div>
```
2. Turbo Pack doesnt support importing static images
3. How does the import in react project work? Like importing images and importing components?
4. What is build time? Fill layout? Compile time? Optimze the image? static optimization?