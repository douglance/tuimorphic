'use client';
import { Avatar } from 'tuimorphic';
export function AvatarBasic() {
    return (<Avatar src="https://api.dicebear.com/7.x/identicon/svg?seed=tuimorphic" alt="User avatar"/>);
}
export function AvatarWithFallback() {
    return (<div className="flex gap-4 items-center">
      <Avatar initials="JD" alt="John Doe"/>
      <Avatar initials="AB" alt="Alice Brown"/>
      <Avatar initials="XY" alt="Xavier Young"/>
    </div>);
}
export function AvatarSizes() {
    return (<div className="flex gap-4 items-center">
      <Avatar initials="SM" size="small" alt="Small avatar"/>
      <Avatar initials="MD" size="medium" alt="Medium avatar"/>
      <Avatar initials="LG" size="large" alt="Large avatar"/>
    </div>);
}
export function AvatarWithImage() {
    return (<div className="flex gap-4 items-center">
      <Avatar src="https://api.dicebear.com/7.x/identicon/svg?seed=user1" alt="User 1" size="small"/>
      <Avatar src="https://api.dicebear.com/7.x/identicon/svg?seed=user2" alt="User 2" size="medium"/>
      <Avatar src="https://api.dicebear.com/7.x/identicon/svg?seed=user3" alt="User 3" size="large"/>
    </div>);
}
export function AvatarAsLink() {
    return (<div className="flex gap-4 items-center">
      <Avatar src="https://api.dicebear.com/7.x/identicon/svg?seed=github" alt="GitHub Profile" href="https://github.com" target="_blank"/>
      <Avatar initials="GH" alt="GitHub Profile" href="https://github.com" target="_blank"/>
    </div>);
}
export function AvatarGroup() {
    const users = [
        { id: 1, initials: 'AB', name: 'Alice Brown' },
        { id: 2, initials: 'CD', name: 'Charlie Davis' },
        { id: 3, initials: 'EF', name: 'Eve Foster' },
        { id: 4, initials: 'GH', name: 'Grace Hall' },
        { id: 5, initials: '+3', name: '3 more users' },
    ];
    return (<div className="flex items-center">
      {users.map((user, index) => (<div key={user.id} style={{ marginLeft: index > 0 ? '-8px' : 0, zIndex: users.length - index }}>
          <Avatar initials={user.initials} alt={user.name} size="medium"/>
        </div>))}
    </div>);
}
export function AvatarImageFallback() {
    return (<div className="flex gap-4 items-center">
      <Avatar src="https://invalid-url-that-will-fail.com/image.jpg" initials="FB" alt="Fallback demo"/>
      <span className="text-sm opacity-70">
        (Image fails, shows initials fallback)
      </span>
    </div>);
}
