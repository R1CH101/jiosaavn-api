import { VercelRequest, VercelResponse } from '@vercel/node'
import { AxiosResponse } from 'axios'
import { lyricsDetails } from 'types'
import { axiosInstance } from '../config/axioss
import { getLyricsUrl } from '../config/endpoints'
import { setHeaders } from '../utils/headers'

const lyrics = async (req: VercelRequest, res: VercelResponse) => {
  setHeaders(res)
  const song_id = req.query.id as string

  try {
    await axiosInstance.get(getLyricsUrl(song_id)).then((lyrics_details: AxiosResponse<lyricsDetails>) => {
      if (!lyrics_details.data.lyrics) res.status(400).json({ message: 'lyrics are not available for this song' })
      else
        res.json({
          lyrics: lyrics_details.data.lyrics.replace(/<br>/g, ' '),
          snippet: lyrics_details.data.snippet,
        })
    })
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong',
    })
  }
}

export default lyrics
