import { Record } from 'neo4j-driver'
import { Notification, OperatorFunction } from 'rxjs'
import { map } from 'rxjs/operators'

// TODO Add custom operators to this.
export const getRecordsByKey = <TData>(key: string): OperatorFunction<Record, TData> =>
  map(record => {
    // TODO: BLOCK This doesn't seem to honor all the records
    const { properties } = record.get(key)
    if (!properties) {
      console.warn(`There are results here, but no result is matched by ${key}`)
      return {}
    }
    // * There is an identity property here which I haven't quite figured out yet.
    return {
      ...properties,
    }
  })

export const getRecordsByKeyNotification = <TData>(key: string): OperatorFunction<Notification<Record>[], TData[]> =>
  map(notification =>
    notification.map(notification => {
      const { properties } = notification.value?.get(key) ?? {}
      if (!properties) {
        console.warn(`There are results here, but no result is matched by ${key}`)
        return {}
      }
      // * There is an identity property here which I haven't quite figured out yet.
      return {
        ...properties,
      }
    }),
  )
