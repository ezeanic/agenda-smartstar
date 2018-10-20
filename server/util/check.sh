#!/bin/sh
#   Use this script to test if a given TCP host/port are available (simplified form of wait-for-it.sh, sjs)

wait_for()
{
    echo "waiting for $HOST:$PORT"

    start_ts=$(date +%s)
    while :
    do
        nc -z $HOST $PORT
        result=$?
        if [[ $result -eq 0 ]]; then
            end_ts=$(date +%s)
            echo "$cmdname: $HOST:$PORT is available after $((end_ts - start_ts)) seconds"
            break
        fi
        sleep 1
    done
    return $result
}

# process arguments
while [[ $# -gt 0 ]]
do
    case "$1" in
        -h)
        HOST="$2"
        if [[ $HOST == "" ]]; then break; fi
        shift 2
        ;;
        -p)
        PORT="$2"
        if [[ $PORT == "" ]]; then break; fi
        shift 2
        ;;
        *)
        echo "Unknown argument: $1"
        usage
        ;;
    esac
done

if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    echoerr "Error: you need to provide a host and port to test."
    usage
fi

wait_for
RESULT=$?
exit $RESULT
