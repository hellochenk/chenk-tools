// 简易的倒计时, 接受并返回时间戳
// todo 跟随系统跳秒

type TimerType = {
  stamp: number|null;
}

const useCounter = (props?:TimerType) => {
  const [stamp, setStamp] = useState<number>(0)
  const ONE_SECEND = useRef<number>(1000)

  const firstTimeRef = useRef<number>(new Date().getTime())
  const indexRef = useRef<number>(0)
  const myStampRef = useRef<number>(0)
  const timerRef = useRef<Array<NodeJS.Timeout>>([])

  const clearTimerRef = useCallback(() => {
    indexRef.current = 0
    firstTimeRef.current = new Date().getTime()
    if (timerRef.current) {
      timerRef.current.forEach((item) => clearTimeout(item))
      timerRef.current = []
    }
  }, [])

  const counting = useCallback(() => {
    console.log(`invoke task myStampRef.current:${myStampRef.current}， time ${indexRef.current}`)
    indexRef.current += 1
    const now = new Date().getTime()
    const diff = now - (firstTimeRef.current + indexRef.current * ONE_SECEND.current)
    const nextTask = ONE_SECEND.current - diff
    myStampRef.current -= ONE_SECEND.current
    setStamp(myStampRef.current)
    // console.log(`myStampRef.current:${myStampRef.current}, nextTask:${nextTask}`)

    if (myStampRef.current <= 0) {
      clearTimerRef()
    } else {
      const recursiveTimer = setTimeout(() => {
        counting()
      }, nextTask)

      timerRef.current.push(recursiveTimer)
    }
  }, [clearTimerRef])

  const checkPropsStampAndStartTask = useCallback((timer?:number) => {
    if (props?.stamp || timer) {
      clearTimerRef()
      myStampRef.current = props?.stamp || timer || 0
      setStamp(props?.stamp || timer || 0)
      setTimeout(counting, ONE_SECEND.current)
    }
  }, [clearTimerRef, counting, props?.stamp])

  const updateStamp = (timer:number) => {
    if (typeof timer !== 'number') {
      throw new Error('need post number')
    }
    clearTimerRef()
    checkPropsStampAndStartTask(timer)
  }

  useEffectAfterQueryReady(() => {
    checkPropsStampAndStartTask()
  }, [checkPropsStampAndStartTask])

  return {
    stamp,
    updateStamp,
  }
}
