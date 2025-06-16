export default function HomeScreen({ onStart }) {
  return (
    <div className="home-screen">
      <p>
        Welcome! This app helps your child practice reading tricky English
        words.
      </p>
      <p>
        You will hear your child read each word aloud and then click "Right" is
        they read it correctly, or "Wrong" if not.
      </p>
      <p>
        Each round has 10 words. Try to encourage your child to read each word
        carefully. At the end, you will see a summary.
      </p>
      <button onClick={onStart}>Start</button>
    </div>
  );
}
