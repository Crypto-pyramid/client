import { createUseStyles } from 'react-jss'
import useWindowDimensions from '../widgets/useWindowDimensions'
import { Helmet } from 'react-helmet'

function Home() {
  const classes = useStyles()
  const { width } = useWindowDimensions()

  return (
    <>
      <Helmet>
        <link rel='canonical' href='https://crypto-pyramid.com/#/' />
        <title>CryptoPyramid - The Ultimate Pyramid Scheme</title>
        <meta
          name='description'
          content='CryptoPyramid is a web3 project that simulates a pyramid scheme. Earn Ethereum by inviting others to join the pyramid.'
        />
      </Helmet>
      <div className={classes.c}>
        <h1>Introduction</h1>
        <div style={{ marginBottom: '100px' }}>
          <div className={classes.text}>
            CryptoPyramid is a web3 project that simulates a pyramid scheme.
            Each user that is invited is asked to pay 0.01ETH of accession fee
            in order to join the pyramid. Only after he pays he is able to
            invite others. For every person that joins using his invitation the
            user immediately receives one third of his accession fee. This means
            that after three successful invitations, you have already earned
            back the money you spent to join. The remaining 2 thirds are evenly
            divided among the pyramid branch.
          </div>
          <iframe
            width={width <= 1024 ? width - 100 : 1024}
            height={(width <= 1024 ? width - 100 : 1024) * 0.56}
            src='https://www.youtube.com/embed/RCkqkvrIwDI'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
          <div className={classes.text}>
            By using smart contracts, the project ensures that all payments are
            made securely and that no one can game the system. CryptoPyramid is
            also completely impartial, meaning that users can invite anyone they
            like without fear of being scammed.
          </div>
          <div className={classes.text}>
            If you are good at recruiting people this is a great way to earn
            some money on the side. Try it out and see for yourself how it
            works!
          </div>
          <div className={classes.text}>
            All bugs, problems and improvements can be discussed in our Discord
            chanel.
          </div>
          <br />
          <div className={classes.text}>
            For questions contact me on telegram. My ID: 5832934195
          </div>
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
  text: {
    fontWeight: '800',
    marginBottom: '10px',
    marginTop: '20px',
  },
}))
