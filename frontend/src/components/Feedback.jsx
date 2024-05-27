import { useState, useEffect } from 'react';


export default function Feedback(props) {
  const langId = props.langId;

  const [upvotes, setUpvotes] = useState(null);
  const [downvotes, setDownvotes] = useState(null);
  const [voteCounter, setVoteCounter] = useState(0);

  async function handleUpvote() {
    await fetch(`/api/v2/feedbacks/vote/${langId}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ vote: 1 })
    });
    setVoteCounter(voteCounter + 1);
  }

  async function handleDownvote() {
    await fetch(`/api/v2/feedbacks/vote/${langId}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ vote: -1 })
    });
    setVoteCounter(voteCounter + 1);
  }

 

  useEffect(() => {
    function updateVotes() {
      fetch(`/api/v2/feedbacks/summary/${langId}`)
      .then(res => res.json())
      .then(summary => {
        setUpvotes(summary.upvotes);
        setDownvotes(summary.downvotes);
      })
      .catch(error => console.log(error));
    }
    updateVotes();
  }, [voteCounter, langId])

  
  return <div className='page'>
    <div className='feedback'>
      <button onClick={handleUpvote}> Like 😍</button>
      <span className='upvote'>{upvotes}</span>
      <button onClick={handleDownvote}> Dislike 😡</button>
      <span className='downvote'>{downvotes}</span>
    </div>
  </div>;
}
