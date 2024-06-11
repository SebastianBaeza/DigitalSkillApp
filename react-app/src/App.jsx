import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {
    
    return (
        <section className='App'>
            <TwitterFollowCard 
                Username="@panchuwu"
                isFollowing
                name="Francisca González"
            />

            <TwitterFollowCard
                Username="@panchuwu"
                isFollowing={false}
                name="Francisca González"
            />
        </section>
        
    )
}