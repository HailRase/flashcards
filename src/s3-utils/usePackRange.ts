import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../s1-main/m2-bll/store";
import {fetchPacks, PackFilter, PackStatus} from "../s1-main/m2-bll/pack-reducer";
import {RangeValue} from "../s1-main/m1-ui/common/DoubleRange/DoubleRange";
import {useEffect, useState} from "react";

const usePackRange = () => {
  const {min, max, ...filter} = useSelector<StoreType, PackFilter>(state => state.pack.filter);
  const [value, setValue] = useState<RangeValue>({min, max});
  const status = useSelector<StoreType, PackStatus>(state => state.pack.status);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateFilter = (min !== value.min) || (max !== value.max);
    if(updateFilter && status === "loaded") {
      dispatch(fetchPacks({...filter, ...value}));
    }
  }, [filter, value, min, max, dispatch, status]);


  return setValue;
}

export default usePackRange;