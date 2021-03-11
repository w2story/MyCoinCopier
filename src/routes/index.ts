import Home from './Home.svelte'
import NotFound from './NotFound.svelte'
import QuickSetup from './QuickSetup.svelte'
import VoiceDonSet from '../components/donSetUp/VoiceDonSet.svelte'
import VideoDonSet from '../components/donSetUp/VideoDonSet.svelte'
import OsuDonSet from '../components/donSetUp/OsuDonSet.svelte'

export default {
  '/': Home,
  '/qsetup': QuickSetup,
  '/voiceDonSet': VoiceDonSet,
  '/videoDonSet': VideoDonSet,
  '/osuDonSet': OsuDonSet,
  '*': NotFound
}