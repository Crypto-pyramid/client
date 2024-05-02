import { createUseStyles } from 'react-jss'
import useWindowDimensions from '../widgets/useWindowDimensions'
import { Helmet } from 'react-helmet'

function FAQ() {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <link rel='canonical' href='https://crypto-pyramid.com/#/faq' />
        <title>CryptoPyramid FAQ - Your Questions Answered</title>
        <meta
          name='description'
          content='Get all your questions about CryptoPyramid answered. Learn how CryptoPyramid works, how to earn with CryptoPyramid, and more.'
        />
      </Helmet>
      <div className={classes.c}>
        <h1>Frequently asked questions</h1>
        <div style={{ marginBottom: '100px' }}>
          <div>Q: What is CryptoPyramid?</div>
          <div>
            A: CryptoPyramid is a fun web3 project that simulates a pyramid
            scheme.
          </div>
          <br />
          <div>Q: Can I be scammed?</div>
          <div>
            A: No, CryptoPyramid is using smart contracts to ensure that all
            payments are made securely.
          </div>
          <br />
          <div>Q: I found a bug, what now?</div>
          <div>
            A: Join our Discord channel or contact me on Telegram. I will reply
            within 24 hours.
          </div>
          <br />
          <div>Q: How can I earn money with CryptoPyramid?</div>
          <div>
            A: By inviting others to join the pyramid. For each new user that
            joins using your invitation, you will earn 0.0033ETH.
          </div>
          <br />
          <div>Q: How much does it cost to join CryptoPyramid?</div>
          <div>A: 0.01ETH</div>
          <br />
          <div className={classes.hidden}>
            Discover the Revolutionary World of CryptoPyramid: Your Gateway to
            Web3 Earnings Welcome to CryptoPyramid, the cutting-edge web3
            project that reimagines the traditional pyramid scheme for the
            blockchain era. Our innovative platform allows users to earn
            Ethereum (ETH) by participating in a decentralized network that
            rewards active engagement and recruitment. With a nominal accession
            fee of just 0.01ETH, you can unlock the potential to earn back your
            investment and more by inviting new members to our community. How
            Does CryptoPyramid Work? CryptoPyramid is built on the principles of
            transparency and fairness, utilizing Ethereum smart contracts to
            ensure every transaction is secure and tamper-proof. When you join
            the pyramid by paying the accession fee, you'll gain the ability to
            invite others to the platform. For every new member you bring on
            board, you'll receive one-third of their accession fee as an
            immediate reward. That means after successfully inviting three new
            users, you've not only recouped your initial investment but you've
            also started making a profit! The beauty of CryptoPyramid lies in
            its simplicity and the power of community. As more people join
            through your referrals, your earning potential increases. The
            remaining two-thirds of each accession fee are distributed evenly
            among your branch of the pyramid, fostering a supportive network
            where everyone benefits from mutual growth. Why Choose
            CryptoPyramid? CryptoPyramid is more than just a platform; it's an
            opportunity for those skilled in networking and recruitment to earn
            substantial side income. Our system is impartial and resistant to
            manipulation, providing a level playing field for all participants.
            Whether you're new to cryptocurrency or a seasoned investor,
            CryptoPyramid offers a unique chance to be a part of the thriving
            web3 movement. Our secure and user-friendly platform is designed to
            maximize your earning potential while minimizing risk. The use of
            smart contracts ensures that all participants adhere to the rules,
            and payouts are automatically executed, leaving no room for scams or
            dishonesty. With CryptoPyramid, you can trust that your efforts and
            investments are protected. Engage with Our Community At
            CryptoPyramid, we value feedback and collaboration. Join our Discord
            channel to discuss any bugs, problems, or improvements with our
            responsive team and fellow users. Your input helps us continually
            refine and enhance the CryptoPyramid experience. Get Started Today!
            Ready to dive into the exciting world of CryptoPyramid? Check out
            our YouTube channel for insightful tutorials and success stories
            from our community. Don't miss the chance to be a part of this
            groundbreaking web3 project. For any questions or to get started,
            contact us on Telegram using the ID: 5832934195. Embark on your
            CryptoPyramid journey today and witness firsthand the power of
            decentralized finance. With CryptoPyramid, the future of earning is
            here – and it's more accessible than ever. Experience the Future of
            Earning with CryptoPyramid In the world of decentralized finance
            (DeFi), opportunities to earn are ever-evolving, and CryptoPyramid
            stands at the forefront of this revolution. By leveraging the power
            of Ethereum blockchain technology, our platform provides a secure
            environment where trust is built into the system. Say goodbye to the
            uncertainties of traditional investment schemes and hello to a
            transparent, equitable way of multiplying your Ethereum holdings.
            Seamless Integration with the Blockchain The backbone of
            CryptoPyramid is the immutable smart contract technology that
            automates transactions and enforces the rules of the platform. This
            blockchain-based approach eliminates intermediaries, reduces
            transaction costs, and provides a tamper-proof record of all
            activities. The result is a seamless, efficient, and fair system
            that puts users first. Maximize Your Earnings Potential
            CryptoPyramid is not just about earning; it's about community
            building. By participating in our platform, you become part of a
            global network of forward-thinking individuals who understand the
            potential of web3 technologies. As your network grows, so does your
            earning potential. With just a few strategic invitations, you can
            watch your digital wallet expand. Join the CryptoPyramid Community
            Today Our Discord channel is the hub for all things CryptoPyramid.
            It's a place to connect with other members, share strategies, and
            stay updated on the latest developments. We are committed to
            fostering a vibrant community where everyone can thrive. Your voice
            matters, and we encourage open dialogue to ensure CryptoPyramid
            remains at the cutting edge of DeFi. Begin Your Journey with
            Confidence We understand that venturing into the world of
            cryptocurrency can be daunting. That's why we've made it easy for
            newcomers and veterans alike to engage with CryptoPyramid. Our
            resources, including detailed YouTube videos, provide you with all
            the information you need to make informed decisions and navigate the
            platform with ease. Don't wait any longer. Take the first step into
            the world of decentralized earnings with CryptoPyramid, and be part
            of a community that's redefining what it means to earn in the
            digital age. Join us now and see the transformative power of web3
            finance in action.
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQ

const useStyles = createUseStyles(() => ({
  c: {
    minHeight: `calc(100vh - 103px)`,
    color: 'white',
    maxWidth: '1024px',
    margin: 'auto',
    padding: '0px 50px',
  },
  hidden: {
    fontSize: '1px',
  },
}))
