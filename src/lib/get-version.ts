import { exec } from "./exec"

export const getVersion = async (): Promise<string> => {
    const {stdout} = await exec('nitric', ['version'])
  
    const version = stdout.trim()
    if (!version) {
      throw new Error('Could not determine installed Nitric CLI version')
    }
  
    return version
  }