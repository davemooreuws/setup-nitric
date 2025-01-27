import os from 'os'
import got from 'got'


const getArch = (arch: string) => {
    const mappings: Record<string, string> = {
      arm64: 'arm64'
    }
  
    return mappings[arch] || 'x86_64'
  }
  
  const getLatestVersion = async () => {
    try {
      // Fetch the latest release information
      const result = await got<{tag_name: string}>(
        'https://api.github.com/repos/nitrictech/cli/releases/latest',
        {responseType: 'json'}
      )
  
      // Extract the tag name (version)
      const version = result.body.tag_name
  
      return version.replace(/^v/, '')
    } catch (error) {
      console.error('Error fetching latest release:', error)
    }
  }

export const getDownloadUrl = async (version: string) => {
    const arch = getArch(os.arch())
  
    if (version.toLowerCase() === 'latest') {
      const latestVersion = await getLatestVersion()
  
      if (!latestVersion) {
        throw new Error('error finding latest nitric version')
      }
  
      version = latestVersion
    }
  
    const filename = `nitric_${version}_Linux_${arch}.tar.gz`
  
    return `https://github.com/nitrictech/cli/releases/download/v${version}/${filename}`
  }