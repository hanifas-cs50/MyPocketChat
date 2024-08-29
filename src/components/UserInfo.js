export default function UserInfo({ userData }) {
  return (
    <div className="mt-8 grid place-items-center">
      <img className="mb-4 size-24 rounded-lg" width={48} height={48} loading="eager" src="./2-ELzxldtU6kACf.png" alt="Profile Pic"></img>
      <h2 className="font-bold">{ userData ? userData.username : "Username" }</h2>
      { userData && userData.email ? <p className="font-semibold text-sm text-zinc-300">{userData.email}</p> : null}
    </div>
  )
};