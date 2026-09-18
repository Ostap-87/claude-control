// Phase 2 will implement one function per source here (blogs -> Telegram -> Facebook,
// in that order per the build plan). Each collector only READS its source and writes
// normalized rows into Post/PublicationEvent — never writes back to the source itself.
export async function runCollectors(db) {
  // Placeholder for Phase 1: no collectors wired up yet.
  // Phase 2 will add, in order:
  //   - collectBlog(db, { streamId: 'blog-aura', repoPath: '...' })
  //   - collectBlog(db, { streamId: 'blog-gtt', repoPath: '...' })
  //   - collectBlogPersonal(db)
  //   - collectTelegram(db, { streamId: 'tg-aura', queuePath: '...' })
  //   - collectTelegram(db, { streamId: 'tg-gtt', queuePath: '...' })
  //   - collectFacebookQueue(db, { streamId: 'fb-aura', queueFile: '...' })
  //   - collectFacebookQueue(db, { streamId: 'fb-gtt', queueFile: '...' })
  return { ranAt: new Date().toISOString(), collectors: [] };
}
