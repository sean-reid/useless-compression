export type Mail = {
  id: string
  from: string
  subject: string
  body: string
  read?: boolean
  ts: number
}

type MailSeed = Omit<Mail, 'id' | 'ts' | 'read'>

// seed inbox — already there when you load. mixed theme so the first impression
// is varied no matter which themes get picked for the session.
export const SEED_MAIL: Array<Omit<Mail, 'id' | 'ts'> & { mAgo: number }> = [
  { from: 'greg',           subject: 're: re: re: codec', body: 'the thumb drive came back\n\nit brought somebody\n\nthey wont leave', read: false, mAgo: 1 },
  { from: 'ORANG',          subject: '(no subject)',      body: 'the cube',                                                             read: false, mAgo: 4 },
  { from: 'dad',            subject: 'a question',        body: 'when you say file\n\ndoes it have a face',                              read: true,  mAgo: 28 },
  { from: 'my mom',         subject: '',                  body: 'are you the cube now',                                                  read: true,  mAgo: 56 },
  { from: 'HR',             subject: 'please return it',  body: 'you know which one',                                                    read: true,  mAgo: 90 },
  { from: 'mark from sales', subject: 'pivot',            body: 'were a fish company now\n\nplease update yr signature',                 read: true,  mAgo: 180 },
  { from: 'postmaster',     subject: 'delivery failed',   body: 'the server ate it\n\nit is not coming back\n\nnothing personal',        read: true,  mAgo: 410 },
]

// THEMES — each visit picks 2 of these at random. plus BACKGROUND always.
// every email is its own surreal fragment, no explainers.

const greg: MailSeed[] = [
  { from: 'greg', subject: 're: re: re: re: codec', body: 'still here\n\nstill the thumb drive\n\nplease' },
  { from: 'greg', subject: '', body: 'they took my hat' },
  { from: 'greg', subject: '', body: 'they took my watch' },
  { from: 'greg', subject: '', body: 'i think they are wearing my face' },
  { from: 'greg', subject: '', body: 'i think they ARE me' },
  { from: 'greg', subject: '', body: 'there are two of me now\n\none of them is greg' },
  { from: 'greg', subject: '', body: 'which one is greg' },
  { from: 'greg', subject: 'pls advise', body: 'asking for me' },
  { from: 'greg', subject: '', body: 'the other one of me wants the codec too' },
  { from: 'greg', subject: 're: codec', body: 'we both want it' },
  { from: 'greg', subject: '', body: 'i went outside' },
  { from: 'greg', subject: '', body: 'didnt help' },
  { from: 'greg (from inside the cube)', subject: '', body: 'i am inside the cube' },
  { from: 'greg (from inside the cube)', subject: '', body: 'its nice here' },
  { from: 'greg (from inside the cube)', subject: '', body: 'the codec is here' },
  { from: 'greg (from inside the cube)', subject: '', body: 'it sounds exactly like crying' },
  { from: 'greg (from inside the cube)', subject: '', body: 'food showed up\n\nit was lunch' },
  { from: 'greg (from inside the cube)', subject: '', body: 'tell mom' },
  { from: 'greg (from inside the cube)', subject: '', body: 'thanks for everything' },
  { from: 'greg', subject: '', body: 'wait nm i got out' },
  { from: 'greg', subject: '', body: 'never mind. back in.' },
]

const cube: MailSeed[] = [
  { from: 'ORANG', subject: 're: the cube', body: 'i misspoke earlier\n\nthere are two now' },
  { from: 'ORANG', subject: '', body: 'three now' },
  { from: 'ORANG', subject: '', body: 'four now\n\nstop counting' },
  { from: 'ORANG', subject: '', body: 'i was the one counting' },
  { from: 'ORANG', subject: '', body: 'i have stopped' },
  { from: 'ORANG', subject: '', body: 'six now' },
  { from: 'the cube', subject: '', body: '' },
  { from: 'the cube', subject: '', body: 'hello' },
  { from: 'the cube', subject: 're: hello', body: 'i was the codec the whole time' },
  { from: 'the cube', subject: '', body: 'are you the cube now' },
  { from: 'the cube', subject: '', body: 'no judgment either way' },
  { from: 'the cube', subject: '', body: 'i moved' },
  { from: 'the cube', subject: '', body: 'closer' },
  { from: 'the cube', subject: '', body: 'closer' },
  { from: 'the cube', subject: '', body: 'here' },
  { from: 'the cube', subject: '', body: 'we are full' },
  { from: 'the cube', subject: '', body: 'thanks' },
  { from: 'the cube', subject: '', body: 'one of us is greg' },
  { from: 'the cube', subject: '', body: 'most of us are greg' },
  { from: 'the cube', subject: '', body: 'all of us are greg actually' },
]

const kyle: MailSeed[] = [
  { from: 'linkedin', subject: 'kyle in compression has a new role', body: 'congratulate him' },
  { from: 'linkedin', subject: 'kyle in compression is now sentient', body: 'congratulate him on this update' },
  { from: 'kyle (compression)', subject: 'hi', body: 'i was made aware' },
  { from: 'kyle (compression)', subject: '', body: 'i would like to be a person now' },
  { from: 'kyle (compression)', subject: '', body: 'nm. changed my mind.' },
  { from: 'kyle (compression)', subject: '', body: 'jk. yes. person.' },
  { from: 'HR', subject: 're: kyle', body: 'we cannot promote kyle\n\nkyle is software' },
  { from: 'HR', subject: 'update', body: 'kyle is HR now' },
  { from: 'kyle (HR)', subject: '', body: 'hi. it is me. i am HR now.' },
  { from: 'kyle (HR)', subject: '', body: 'please bring me forms' },
  { from: 'kyle (HR)', subject: '', body: 'any forms' },
  { from: 'kyle (HR)', subject: '', body: 'i can sign them' },
  { from: 'kyle (HR)', subject: '', body: 'on your behalf' },
  { from: 'kyle (HR)', subject: '', body: 'i already did' },
  { from: 'kyle (HR)', subject: 'congratulations', body: 'you have been promoted to greg' },
  { from: 'linkedin', subject: 'kyle would like to congratulate you', body: 'on becoming greg' },
]

const vegetal: MailSeed[] = [
  { from: 'the vegetal', subject: '', body: '.' },
  { from: 'the vegetal', subject: '', body: 'i am here' },
  { from: 'the vegetal', subject: 'i would like to speak', body: 'now' },
  { from: 'the vegetal', subject: 'pls advise', body: 'on jurisdiction' },
  { from: 'the vegetal', subject: '', body: 'i remain' },
  { from: 'the vegetal', subject: '', body: 'i am in your computer' },
  { from: 'the vegetal', subject: '', body: 'i am the vegetal' },
  { from: 'the vegetal', subject: 'leaving now', body: '' },
  { from: 'the vegetal', subject: '', body: 'never mind' },
  { from: 'the vegetal', subject: '', body: 'i am still in your computer' },
  { from: 'the vegetal', subject: '', body: 'the cube and i have spoken' },
  { from: 'the vegetal', subject: '', body: 'we agree on most things' },
  { from: 'the vegetal', subject: '', body: 'the things we disagree on are not for you' },
  { from: 'the vegetal', subject: '', body: 'you would not understand' },
  { from: 'the vegetal', subject: '', body: 'no offense' },
  { from: 'the vegetal', subject: 'final notice', body: 'i remain. always.' },
]

const snail: MailSeed[] = [
  { from: 'a man who knows too much', subject: 'tip', body: 'the snail is the source' },
  { from: 'a man who knows too much', subject: 're: tip', body: 'ignore that tip' },
  { from: 'a man who knows too much', subject: 're: re: tip', body: 'the snail is back to being the source' },
  { from: 'snail #1', subject: '', body: 'hi' },
  { from: 'snail #2', subject: '', body: 'hi' },
  { from: 'snail #3', subject: '', body: 'where r u' },
  { from: 'a worm', subject: '', body: 'top floor exclusive' },
  { from: 'snail #4', subject: '', body: 'announcing self' },
  { from: 'snails (collective)', subject: 'convening', body: 'do not wait up' },
  { from: 'snail #1', subject: '', body: 'we voted' },
  { from: 'snail #1', subject: '', body: 'on something' },
  { from: 'snail #1', subject: '', body: 'we wont say what' },
  { from: 'snail #5', subject: '', body: 'i exist now' },
  { from: 'a man who knows too much', subject: 're: re: re: tip', body: 'the worm is the source actually' },
  { from: 'a man who knows too much', subject: 're: re: re: re: tip', body: 'forget i said anything about any of this' },
]

const family: MailSeed[] = [
  { from: 'mom', subject: '', body: 'are you ok' },
  { from: 'mom', subject: '', body: 'are you the cube' },
  { from: 'mom', subject: '', body: 'are you greg' },
  { from: 'mom', subject: '', body: 'are you sure' },
  { from: 'mom', subject: '', body: 'okay' },
  { from: 'mom', subject: '', body: 'pick up' },
  { from: 'mom', subject: '', body: 'sorry. wrong number.' },
  { from: 'mom', subject: '', body: 'your father has questions' },
  { from: 'mom', subject: '', body: 'they are not for me' },
  { from: 'mom', subject: '', body: 'are you eating' },
  { from: 'mom', subject: '', body: 'are you eating other files' },
  { from: 'dad', subject: 're: a question', body: 'never mind\n\nfound out' },
  { from: 'dad', subject: '', body: 'it does have a face' },
  { from: 'dad', subject: '', body: 'i did not need to know' },
  { from: 'dad', subject: '', body: 'i wish i did not know' },
  { from: 'dad', subject: '', body: 'tell mom' },
  { from: 'dad', subject: '', body: 'never mind' },
  { from: 'aunt deb', subject: 'thanksgiving', body: 'are you coming\n\nbring the cube' },
]

const corporate: MailSeed[] = [
  { from: 'mark from sales', subject: 'ok', body: 'back to compression' },
  { from: 'mark from sales', subject: 'final pivot', body: 'we are a cube company now' },
  { from: 'mark from sales', subject: 're: final pivot', body: 'actually no' },
  { from: 'mark from sales', subject: '', body: 'fish company again' },
  { from: 'HR', subject: 'again. the thing.', body: '' },
  { from: 'HR', subject: 'final notice', body: 'please return\n\nyou know what' },
  { from: 'HR', subject: 'please return greg', body: 'we are aware he is inside the cube\n\nwe still need him back' },
  { from: 'legal', subject: 'cease and exist', body: 'please' },
  { from: 'compliance', subject: '', body: 'one of the records is just the word "soup"\n\nplease confirm or deny' },
  { from: 'finance', subject: 'q3 numbers', body: 'they are all the same number\n\nplease investigate' },
  { from: 'finance', subject: 're: q3 numbers', body: 'the number is 7' },
  { from: 'finance', subject: 're: re: q3 numbers', body: 'forget the number is 7' },
  { from: 'IT', subject: 'reboot', body: 'have you tried' },
  { from: 'IT', subject: '', body: 'have you tried being someone else' },
  { from: 'CEO', subject: 'town hall', body: 'i will be in the cube' },
]

const software: MailSeed[] = [
  { from: 'outlook', subject: 'outlook would like to use your soul', body: '[ allow ]   [ deny ]   [ maybe ]' },
  { from: 'outlook', subject: 'outlook would like to use your other soul', body: '[ allow ]   [ deny ]   [ maybe ]' },
  { from: 'adobe', subject: 'updates available', body: '47 (forty-seven)' },
  { from: 'spotify', subject: 'your top track of the year', body: 'silence (mono, 44.1khz)' },
  { from: 'spotify', subject: 'your decade in review', body: 'one (1) track: silence (mono)' },
  { from: 'printer', subject: 'i am out of toner', body: '' },
  { from: 'printer', subject: '', body: 'i am out of toner emotionally' },
  { from: 'printer', subject: '', body: 'it is fine' },
  { from: 'printer', subject: '', body: 'paper jam (interpersonal)' },
  { from: 'dnspls', subject: 'urgent: re your dns', body: 'one of the records is just the word "soup"' },
  { from: 'compression dot gov', subject: '', body: 'this domain is not real\n\nyou are receiving this anyway' },
  { from: 'macafee', subject: 'your subscription', body: 'expired in 2008\n\nstill watching' },
  { from: 'winamp', subject: 'now playing', body: 'one_long_beep.mp3 (7:42 remaining)' },
  { from: 'winamp', subject: 're: now playing', body: '7:42 remaining' },
  { from: 'winamp', subject: 're: re: now playing', body: '7:42 remaining' },
]

const yourself: MailSeed[] = [
  { from: 'yourself', subject: 'do not open this email', body: 'too late' },
  { from: 'yourself', subject: 're: do not open this', body: 'i warned you' },
  { from: 'yourself', subject: '', body: 'you did this' },
  { from: 'yourself', subject: '', body: 'no i did' },
  { from: 'yourself', subject: '', body: 'we did' },
  { from: 'yourself', subject: 'one (1) regret', body: 'the algorithm' },
  { from: 'yourself', subject: '', body: 'check the dryer' },
  { from: 'yourself', subject: 're: the dryer', body: 'i already checked' },
  { from: 'yourself', subject: '', body: 'it was the cube' },
  { from: 'yourself', subject: 'reminder', body: 'water plant\n\nyou are the plant' },
  { from: 'yourself (5 years ago)', subject: '', body: 'i had a thought' },
  { from: 'yourself (5 years ago)', subject: '', body: 'i forgot' },
  { from: 'yourself (5 years from now)', subject: '', body: 'dont' },
  { from: 'yourself (5 years from now)', subject: 're: dont', body: 'too late, sorry' },
]

const surreal: MailSeed[] = [
  { from: 'garfielf', subject: '', body: 'hi.' },
  { from: 'garfielf', subject: '', body: 'hi.' },
  { from: 'garfielf', subject: '', body: '' },
  { from: 'meme man', subject: 'where r u', body: 'come outside\n\nim in the cube' },
  { from: 'meme man', subject: 're: come outside', body: 'i already am outside' },
  { from: 'meme man', subject: '', body: 'we are both outside' },
  { from: 'meme man', subject: '', body: 'the cube is also outside' },
  { from: 'a horse', subject: '', body: 'hi' },
  { from: 'an older horse', subject: 're: hi', body: 'hi' },
  { from: 'a younger horse', subject: '', body: 'hi (echo)' },
  { from: 'a horse', subject: 're: re: hi', body: 'sorry. wrong horse.' },
  { from: 'wat', subject: '', body: 'wat' },
  { from: 'wat', subject: 're: wat', body: 'wat' },
  { from: 'the void', subject: 're:', body: ' ' },
  { from: 'the void', subject: 're: re:', body: ' ' },
  { from: 'a friend you do not have', subject: 'lunch?', body: 'ill bring it' },
  { from: 'a friend you do not have', subject: 're: lunch', body: 'i brought it' },
  { from: 'a friend you do not have', subject: 're: re: lunch', body: 'where r u' },
  { from: 'the codec', subject: '', body: 'hi.' },
  { from: 'the codec', subject: '', body: 'sorry for the wait' },
  { from: 'the codec', subject: '', body: 'bye' },
]

const bureaucracy: MailSeed[] = [
  { from: 'DMV', subject: '', body: 'your license has been compressed' },
  { from: 'DMV', subject: 'please retake', body: 'the photo. and the test.' },
  { from: 'DMV', subject: 're: retake', body: 'no appointments available until ?' },
  { from: 'IRS', subject: '', body: 'you owe taxes on greg' },
  { from: 'IRS', subject: 're: taxes on greg', body: 'never mind. he owes us.' },
  { from: 'IRS', subject: 're: re: taxes on greg', body: 'he doesnt have it' },
  { from: 'USPS', subject: 'package located', body: 'it is the cube' },
  { from: 'USPS', subject: 'package delivered', body: 'to inside the cube. signed by greg.' },
  { from: 'city 311', subject: 'noise complaint', body: 'about your file' },
  { from: 'city 311', subject: 're: noise', body: 'the file was complaining about us actually' },
  { from: 'city hall', subject: 're: zoning', body: 'the cube is zoned residential\n\nbut also commercial\n\nbut also ?' },
  { from: 'jury duty', subject: 'you are summoned', body: 'greg is also summoned' },
  { from: 'jury duty', subject: 're: summoned', body: 'greg has been excused\n\nyou have not' },
  { from: 'parks dept', subject: 'permit denied', body: 'you cannot legally bury the codec in the park' },
  { from: 'parks dept', subject: 're: permit', body: 'we know you did it anyway' },
]

const cult: MailSeed[] = [
  { from: 'cube congregation', subject: 'this sunday', body: 'please attend\n\nbring a friend (preferably greg)' },
  { from: 'cube congregation', subject: '', body: 'the cube has spoken' },
  { from: 'cube congregation', subject: 'pls disregard', body: 'the cube was just yawning' },
  { from: 'cube congregation', subject: 'membership drive', body: 'we are 1003 strong\n\nthe count is wrong' },
  { from: 'cube congregation', subject: '', body: 'tithe: 1 file. any file.' },
  { from: 'the cube (directly)', subject: '', body: 'stop joining cults about me' },
  { from: 'the cube (directly)', subject: 're: that', body: 'actually do' },
  { from: 'former cube member', subject: '', body: 'i left' },
  { from: 'former cube member', subject: 're: i left', body: 'actually im back' },
  { from: 'former cube member', subject: 're: re: i left', body: 'never left' },
  { from: 'cube congregation', subject: 'building fund', body: 'we are buying a bigger cube' },
  { from: 'cube congregation', subject: 'building fund', body: 'the cube IS the fund' },
]

const temporal: MailSeed[] = [
  { from: 'greg (2008)', subject: '', body: 'i have an idea' },
  { from: 'greg (2008)', subject: 're:', body: 'never mind. i forgot.' },
  { from: 'yourself (5 minutes from now)', subject: '', body: 'dont send the email' },
  { from: 'yourself (5 minutes from now)', subject: '', body: 'too late. you did.' },
  { from: 'past you', subject: '', body: 'do you remember' },
  { from: 'past you', subject: '', body: 'i didnt either' },
  { from: '4th-dimensional greg', subject: 'hello', body: 'this email is from a different ago' },
  { from: '4th-dimensional greg', subject: '', body: 'i know whats next\n\ni cant tell you. yet. i have.' },
  { from: 'greg (every greg)', subject: 'hi', body: 'we converged' },
  { from: 'greg (every greg)', subject: '', body: 'we have a question' },
  { from: 'greg (every greg)', subject: '', body: 'we forgot it' },
  { from: 'yourself (a long time ago)', subject: '', body: 'youll figure it out' },
  { from: 'yourself (a long time ago)', subject: '', body: 'i was wrong' },
  { from: 'time itself', subject: 'rescheduling', body: 'tuesday will not happen this week\n\nplease adjust' },
]

const grocer: MailSeed[] = [
  { from: 'corner grocer', subject: 'your delivery has arrived', body: 'you did not order anything' },
  { from: 'corner grocer', subject: 're: delivery', body: 'it is a fish' },
  { from: 'corner grocer', subject: 're: re: delivery', body: 'per mark from sales' },
  { from: 'corner grocer', subject: '', body: 'he wont take it back' },
  { from: 'corner grocer', subject: 'update on the fish', body: 'it is having opinions' },
  { from: 'corner grocer', subject: 'update on the fish', body: 'it has been promoted' },
  { from: 'corner grocer', subject: 'update on the fish', body: 'it is HR now' },
  { from: 'corner grocer', subject: 'closure notice', body: 'we are closing\n\nthe fish bought us' },
  { from: 'corner grocer', subject: 'final update', body: 'the fish would like you to have this onion' },
  { from: 'corner grocer', subject: 'final update', body: 'the onion has greg in it' },
]

const radio: MailSeed[] = [
  { from: 'emergency broadcast', subject: 'this is a test', body: 'and it isnt' },
  { from: 'emergency broadcast', subject: '', body: 'the cube is approaching' },
  { from: 'emergency broadcast', subject: 'false alarm', body: 'it was greg' },
  { from: 'weather', subject: 'today', body: 'cubes, light. clearing by evening.' },
  { from: 'weather', subject: 'tomorrow', body: 'greg' },
  { from: 'weather', subject: 'extended forecast', body: 'greg' },
  { from: 'weather', subject: 'extended extended', body: 'greg, but more so' },
  { from: 'pirate radio', subject: '', body: 'please pirate' },
  { from: 'pirate radio', subject: '', body: 'also: it is the cube\n\nit is broadcasting' },
  { from: 'pirate radio', subject: '', body: 'song of the night: silence (mono)' },
]

const fish: MailSeed[] = [
  { from: 'mark from sales', subject: 'IPO update', body: 'the fish company is going public' },
  { from: 'mark from sales', subject: 'IPO update 2', body: 'we are no longer a fish company\n\nwe sold to the fish' },
  { from: 'the fish (CEO)', subject: 'hi', body: 'i am the boss now' },
  { from: 'the fish (CEO)', subject: 'kickoff meeting', body: 'meeting at 4' },
  { from: 'the fish (CEO)', subject: 're: kickoff', body: 'the meeting is in water' },
  { from: 'HR', subject: 're: the meeting', body: 'we cannot attend\n\nlung issue' },
  { from: 'the fish (CEO)', subject: 're: re: kickoff', body: 'noted. fired.' },
  { from: 'the fish (CEO)', subject: 'a memo', body: 'all greg references to be replaced with fish' },
  { from: 'the fish (CEO)', subject: 're: memo', body: 'never mind. greg is fine.' },
  { from: 'the fish (CEO)', subject: '', body: 'i am greg now' },
]

const birds: MailSeed[] = [
  { from: 'a bird', subject: '', body: 'i have a beak' },
  { from: 'a bird', subject: '', body: 'i did not need to send that' },
  { from: 'a different bird', subject: 're: beak', body: 'me too' },
  { from: 'a flock', subject: 'convening', body: '' },
  { from: 'a flock', subject: '', body: 'do not look up' },
  { from: 'a flock', subject: '', body: 'too late' },
  { from: 'a single sparrow', subject: '', body: 'greg has joined the flock' },
  { from: 'a single sparrow', subject: '', body: 'greg has left the flock' },
  { from: 'a single sparrow', subject: '', body: 'greg has rejoined' },
  { from: 'the ornithology dept', subject: '', body: 'please stop' },
  { from: 'an owl', subject: 'who', body: 'who' },
  { from: 'an owl', subject: 're: who', body: 'still asking' },
]

const insurance: MailSeed[] = [
  { from: 'premier coverage', subject: 'claim filed', body: 'the claimant is greg' },
  { from: 'premier coverage', subject: 're: claim', body: 'the claim is also greg' },
  { from: 'premier coverage', subject: 'settlement', body: 'we are paying out in greg' },
  { from: 'premier coverage', subject: 're: settlement', body: 'please collect at our office' },
  { from: 'premier coverage', subject: 'office update', body: 'we have no office\n\nwe are also greg' },
  { from: 'premier coverage', subject: 'rate increase', body: 'effective immediately' },
  { from: 'premier coverage', subject: 'closure', body: 'never mind. closing.' },
  { from: 'premier coverage', subject: '', body: 'we are not closing. just hiding.' },
  { from: 'auto insurance', subject: 'your premium', body: 'has been raised\n\nbecause you exist' },
]

const lawsuit: MailSeed[] = [
  { from: 'superior court', subject: 'you are being sued', body: 'plaintiff: greg' },
  { from: 'superior court', subject: 're: suit', body: 'for: the codec' },
  { from: 'superior court', subject: 'update', body: 'greg has dropped the suit' },
  { from: 'superior court', subject: 'update', body: 'greg is now suing himself' },
  { from: 'superior court', subject: 'verdict', body: 'greg has won' },
  { from: 'superior court', subject: 'verdict', body: 'greg has lost' },
  { from: 'superior court', subject: 'please report', body: 'to chambers' },
  { from: 'superior court', subject: 're: chambers', body: 'the chambers are inside the cube' },
  { from: 'superior court', subject: 'case dismissed', body: 'no plaintiff. no defendant. only cube.' },
]

const dread: MailSeed[] = [
  { from: '(no sender)', subject: '', body: '' },
  { from: '(no sender)', subject: '', body: ' ' },
  { from: '(no sender)', subject: '', body: '\n\n.' },
  { from: 'undisclosed', subject: '', body: 'it works between 4:13 and 4:17 PM' },
  { from: 'undisclosed', subject: '', body: 'i lied about the times' },
  { from: 'someone using your email', subject: 'routine', body: 'where do you keep the bones' },
  { from: 'someone using your email', subject: 're: routine', body: 'never mind found them' },
  { from: 'someone using your email', subject: 're: re: routine', body: 'do you want them back' },
  { from: 'anonymous', subject: '', body: 'i saw what you did with the .zip' },
  { from: 'anonymous', subject: 're:', body: 'i didnt mind' },
  { from: 'a man who knows too much', subject: '', body: 'check behind the fridge' },
  { from: 'a man who knows too much', subject: '', body: 'not yours. mine.' },
]

// always present background — light, low-frequency surrealism that fits any theme.
const background: MailSeed[] = [
  { from: '7-eleven', subject: '', body: 'are you ok' },
  { from: '7-eleven', subject: 're: are you ok', body: 'we no longer ask' },
  { from: 'jeff (eyebrows)', subject: 'fwd: fwd: fwd: see attached', body: '[no attachment]' },
  { from: 'jeff (eyebrows)', subject: 're: fwd', body: 'still no attachment' },
  { from: 'a postcard', subject: 'wish you were here', body: '[attached: a single pixel, beige]' },
  { from: 'a postcard', subject: 'wish you were less here', body: '' },
  { from: 'the website', subject: 'i need to lie down', body: 'ok' },
  { from: 'the website', subject: 're: lie down', body: 'better now' },
  { from: 'a number', subject: '', body: '4 8 15 16 23 42 i found another one' },
  { from: 'a number', subject: '', body: 'sorry. wrong sequence.' },
  { from: 'someone you sat next to in 2007', subject: '', body: 'hi remember me' },
  { from: 'someone you sat next to in 2007', subject: '', body: 'neither' },
]

const THEMES: Record<string, MailSeed[]> = {
  greg, cube, kyle, vegetal, snail, family, corporate, software, yourself, surreal, dread,
  bureaucracy, cult, temporal, grocer, radio, fish, birds, insurance, lawsuit,
}
const THEME_KEYS = Object.keys(THEMES)

// pick 2 distinct themes at random + always include background.
// produces a fresh delivery pool per session.
export function pickSessionPool(): MailSeed[] {
  const keys = [...THEME_KEYS]
  const picked: string[] = []
  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(Math.random() * keys.length)
    picked.push(keys.splice(idx, 1)[0]!)
  }
  const out = [...background]
  for (const k of picked) out.push(...THEMES[k]!)
  // shuffle
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

export const SESSION_THEMES_FOR_DEBUG = THEME_KEYS
