import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HamsterProfile from './HamsterProfile';

const Wrapper = styled.section`
    @media (min-width: 992px){
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        & > div {
            cursor: pointer;
        }
    }
`

const HamsterCard = styled.div`
    display: flex;
    justify-content:flex-start;
    align-items: center;
    background-color: rgba(255,255,255,0.5);
    width: 100%;
    margin: 1em 0;
    cursor:pointer;
    & > img {
        margin-left: 1em;
    }
    & > div > h2 { 
        margin-left: 1em;
        margin-right: 1em;
    }
    @media (min-width: 992px){
        width: 17em;
        margin: 0.5em;
        & > img {
            margin: 0.5em;
        }
        & > div > h2 {
            margin: 0.5em;
        }
    }
    `

const HamsterPic = styled.img`
    width: 3em;
    height: 3em;
    border-radius: 50%;
    border: 2px dotted white;
    object-fit: cover;
` 

const AllHamsters = () => {
    const [hamsterArr, setHamsterArr] = useState(null);
    const [showId, setShowId] = useState(null);
    const [rerender, setRerender] = useState(0);

    const handleCardClick = (id) => {
        setHamsterArr(null);
        setShowId(id);
    }

    const handleProfileClick = () => {
        setShowId(null);
        setRerender(rerender + 1);
    }

    useEffect(() => {
        const headers = new Headers();
        headers.append('Authorization', 'q7RY4dfQ59pzY8zA');

        const options = {
            method: 'GET',
            headers,
            redirect: 'follow'
        };

        fetch('/hamsters', options)
            .then(res => res.text())
            .then(data => setHamsterArr(JSON.parse(data)))
            .catch(err => console.error('Error: ', err))
    },[rerender])

    return (
        <Wrapper>
            {
                hamsterArr
                ? hamsterArr.sort((a,b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();

                    let comparison = 0;

                    if(nameA > nameB){
                        comparison = 1;
                    }else if(nameB > nameA){
                        comparison = -1;
                    }
                    return comparison;
                })
                .map(h => (                    
                    <HamsterCard key={h.id} onClick={e => handleCardClick(h.id)}>
                        <HamsterPic src={"/pics/" + h.imgName} alt={h.name} />
                        <div>
                            <h2>{h.name}</h2>
                        </div>
                    </HamsterCard>
                    )
                )
                : null
            }
            {showId
                ?   <div onClick={handleProfileClick}>
                        <HamsterProfile id={showId} />
                    </div>
                : null
            }
        </Wrapper>
    )
}

export default AllHamsters;