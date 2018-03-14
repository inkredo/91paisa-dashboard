import { Component, default as React } from 'react'
import { RouteComponentProps } from 'react-router'
import { AutoSizer, Column } from 'react-virtualized'
import { ITransaction } from '../../api/transaction-api'
import { lightGrey } from '../../styles/colors'
import {
  evenRow,
  headerRow,
  oddRow,
  TableContainer,
} from '../../styles/table-styles'
import AmountCell from './AmountCell'
import TimeCell from './TimeCell'
import UserCell from './UserCell'
interface IProps extends RouteComponentProps<IProps> {
  transactions: ITransaction[]
}

class TransactionsList extends Component<IProps, {}> {
  public render() {
    return (
      <div style={{ margin: '0', height: '100vh' }}>
        <AutoSizer style={{ width: '100%' }}>
          {({ width, height }: any) => (
            <TableContainer
              style={{
                background: `${lightGrey}`,
                borderLeft: `2px solid ${lightGrey}`,
                borderRadius: 0,
              }}
              width={width}
              height={height}
              headerHeight={48}
              rowHeight={88}
              rowStyle={this.rowStyler}
              onRowClick={this.handleRowClick}
              overscanColumnCount={3}
              rowCount={this.props.transactions.length}
              rowGetter={({ index }: any) => this.props.transactions[index]}
            >
              <Column
                label="Amount"
                width={100}
                dataKey="amount"
                cellRenderer={this.handleAmountCell}
              />
              <Column
                label="Customer"
                width={190}
                dataKey="amount"
                cellRenderer={this.handleCustomerCell}
              />
              <Column
                label="Beneficiary"
                width={190}
                dataKey="amount"
                cellRenderer={this.handleBeneficiaryCell}
              />
              <Column
                label="Created at"
                width={150}
                dataKey="amount"
                cellRenderer={this.handleCreatedTimeStamp}
              />
              <Column
                label="Updated at"
                width={150}
                dataKey="amount"
                cellRenderer={this.handleUpdatedTimeStamp}
              />
            </TableContainer>
          )}
        </AutoSizer>
      </div>
    )
  }

  private handleAmountCell = ({ rowData }: any) => (
    <AmountCell amount={rowData.amount} />
  )

  private handleCustomerCell = ({ rowData }: any) => (
    <UserCell data={rowData.customer} />
  )
  private handleBeneficiaryCell = ({ rowData }: any) => (
    <UserCell data={rowData.beneficiary} />
  )
  private handleCreatedTimeStamp = ({ rowData }: any) => (
    <TimeCell time={rowData.createdTimestamp} />
  )
  private handleUpdatedTimeStamp = ({ rowData }: any) => (
    <TimeCell time={rowData.updatedTimestamp} />
  )

  private handleRowClick = ({ rowData }: any) => {
    const nav = this.props.history
    nav.push(nav.location.pathname + '/' + rowData.phone)
  }

  private rowStyler = ({ index }: any) => {
    if (index < 0) {
      return headerRow
    }
    return index % 2 === 0 ? evenRow : oddRow
  }
}

export default TransactionsList
