import axios from 'axios'
import { LogsPath } from './constants-api'
export const LOG_FETCH_LIMIT = 40
export interface IIVRLogs {
  beneficiaryPhone?: string
  customer: {
    name?: string
    phone: string
  }
  id: string
  createdTimestamp: string
  updatedTimestamp: string
  transaction: {
    amount?: number
    id?: string
  }
}

const ivrLogsFormData = (
  limit: number,
  offset: number,
  customerPhone?: string,
) => {
  const data = new FormData()
  data.append('limit', limit.toString())
  data.append('offset', offset.toString())
  if (customerPhone) {
    data.append('phone', customerPhone)
  }
  return data
}

export const fetchIVRLogsAPI = (offset: number, customerPhone?: string) =>
  axios
    .post(LogsPath.ivr, ivrLogsFormData(LOG_FETCH_LIMIT, offset, customerPhone))
    .then((r): IIVRLogs[] => {
      const data = r.data.data
      return data.map((log: any): IIVRLogs => ({
        beneficiaryPhone: log.beneficiary_phone.String,
        createdTimestamp: log.created_at,
        customer: {
          name: log.customer_name.String,
          phone: log.caller,
        },
        id: log.call_sid,
        transaction: {
          amount: log.amount.Int64,
          id: log.transaction_id.String,
        },
        updatedTimestamp: log.updated_at,
      }))
    })
