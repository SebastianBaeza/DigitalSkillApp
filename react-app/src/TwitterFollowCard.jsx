export function TwitterFollowCard ({ Username, name, isFollowing }) {
    console.log(isFollowing)

    //const imageSrc = `https://unavatar.io/${userName}`
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img
                    className='tw-followCard-avatar'
                    alt="avatar-icono"
                    src="https://yt3.ggpht.com/yti/ANjgQV8XNa2rfryaghkNtqDlchrOSIMOijY_zu00q3NUcME=s88-c-k-c0x00ffffff-no-rj-mo"
                />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span
                        className='tw-followCard-infoUsername'
                    >{Username}</span>
                </div>
            </header>
            <aside>
                <button className='tw-followCard-button'>
                    Seguir
                </button>
            </aside>
        </article>
    )
}