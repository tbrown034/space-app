export default function UserName({ session }) {
  if (!session?.user) return null;

  return (
    <div className="mt-4 text-lg">
      <p>Welcome, {session.user.name}</p>
    </div>
  );
}
