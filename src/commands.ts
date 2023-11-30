import {exec} from './lib/exec'

const up = (stackName: string) =>
  exec(`nitric up --ci --stack ${stackName}`).then(r => r.stdout)

const down = (stackName: string) =>
  exec(`nitric down --ci --stack ${stackName}`).then(r => r.stdout)

export const commands = {
  up,
  down
}
