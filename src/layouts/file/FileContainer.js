import File from './File'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    IpfsStorage: state.contracts.IpfsStorage,
    drizzleStatus: state.drizzleStatus
  }
}

const FileContainer = drizzleConnect(File, mapStateToProps);

export default FileContainer
