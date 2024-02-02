import { createUseStyles } from 'react-jss'
import useWindowDimensions from '../widgets/useWindowDimensions'
import { Adsense } from '@ctrl/react-adsense'

function Home() {
  const classes = useStyles()
  const { width } = useWindowDimensions()

  return (
    <>
      <div className={classes.c}>
        <h1>Introduction</h1>
        <div style={{ marginBottom: '100px' }}>
          <h4>
            CryptoPyramid is a web3 project that simulates a pyramid scheme.
            Each user that is invited is asked to pay 0.01ETH of accession fee
            in order to join the pyramid. Only after he pays he is able to
            invite others. For every person that joins using his invitation the
            user immediately receives one third of his accession fee. This means
            that after three successful invitations, you have already earned
            back the money you spent to join. The remaining 2 thirds are evenly
            divided among the pyramid branch.
          </h4>
          <iframe
            width={width <= 1024 ? width - 100 : 1024}
            height={(width <= 1024 ? width - 100 : 1024) * 0.56}
            src='https://www.youtube.com/embed/RCkqkvrIwDI'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
          <h4>
            By using smart contracts, the project ensures that all payments are
            made securely and that no one can game the system. CryptoPyramid is
            also completely impartial, meaning that users can invite anyone they
            like without fear of being scammed.
          </h4>
          <h4>
            If you are good at recruiting people this is a great way to earn
            some money on the side. Try it out and see for yourself how it
            works!
          </h4>
          <h4>
            All bugs, problems and improvements can be discussed in our Discord
            chanel.
          </h4>
          <br />
          <h4>For questions contact me on telegram. My ID: 5832934195</h4>
        </div>
      </div>
    </>
  )
}

export default Home

const useStyles = createUseStyles(() => ({
  c: {
    minHeight: `calc(100vh - 103px)`,
    color: 'white',
    maxWidth: '1024px',
    textAlign: 'center',
    margin: 'auto',
    padding: '0px 50px',
  },
}))
