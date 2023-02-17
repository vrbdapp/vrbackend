const User = require("../models/User")
const DepositRecord = require("../models/DepositRecord")
const DailyRoi = require("../models/DailyRoi")
const LapRoi = require("../models/LapRoi")
const MyUpperline = require("../models/MyUpperlines")
const LevelDailyRoi = require("../models/LevelDailyRoi")
const { updateTeamRecord } = require("../helpers/update-team-record")
const ShortRecord = require("../models/ShortRecord")

exports.checkTeamRecord = async (req, res) => {

  const findAllUsers = await User.find()

  for (let indexdf = 0; indexdf < findAllUsers.length; indexdf++) {
    const MeUser = findAllUsers[indexdf];








    // console.log(MeUser._id)
    
    var findUser = MeUser
    
    const getPackage = await DepositRecord.find({ RecordOwner: MeUser._id })


    var totalStakedAmount = 0

    getPackage.map((hit) => {
      return totalStakedAmount = totalStakedAmount + Number(hit.DepositAmount)
    })


    var AmountPercantage = totalStakedAmount * 300 / 100


    const getShortDatForTotalEarnig = await ShortRecord.findOne({RecordOwner:MeUser._id})


    if (getShortDatForTotalEarnig) {

      let DailyEarning = getShortDatForTotalEarnig.AllTimeDailyBusiness
      let CareerEarning = getShortDatForTotalEarnig.AllTimeCareerReward
      let LevelEarning = getShortDatForTotalEarnig.AllTimeLevelBusiness

      var sums = DailyEarning + CareerEarning +LevelEarning
    }else{
      var sums = 0

    }












    if (Number(sums) < Number(AmountPercantage)) {

      if (getPackage.length > 0) {
        // console.log("he has some pakage")
  
        for (let indexs = 0; indexs < getPackage.length; indexs++) {
  
          var ele = getPackage[indexs];
  
          var depositedAmount = Number(ele.DepositAmount)

          // console.log("this user invested ===>")
  
          var Dates = new Date()
  
          var getDay = Dates.getDate()
          var getMonth = Dates.getMonth() + 1
          var getYear = Dates.getFullYear()
  
          var findTodayROIData = await DailyRoi.find({ RoiOwner: findUser._id, Date: `${getYear}-${getMonth}-${getDay}` }).sort({ datefield: -1 })
          var findTodayROIDataOld = await DailyRoi.find({ RoiOwner: findUser._id }).sort({ _id: -1 })
  
          const today = new Date();
          const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
          var findMyPackageDate = await DepositRecord.findOne({ RecordOwner: findUser._id, Date: getYear + "-" + getMonth + "-" + getDay })
  
  
  
          if (findTodayROIDataOld.length > 0) {
            // console.log("i am comming first block =====================>")
            var lastDataDate = findTodayROIDataOld[0].createdAt
  
  
            let date1 = new Date(lastDataDate);
            let date2 = new Date();
  
            let differenceInTime = date2.getTime() - date1.getTime();
            let differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
            var diffDays = Math.floor(differenceInDays)
  
            var num = 0
  
            var index = 1
            var percan = depositedAmount * 0.5 / 100
  
  
            // console.log("And this user will get this much of amount => " + percan)
  
            // while (Number(num) < Number(diffDays)) {
  
  
            if (Number(sums) < Number(AmountPercantage)) {
              
            var giveReward = await DailyRoi({
              RoiOwner: findUser._id,
              StepsWalked: "0",
              GiveRoiCoin: percan,
              GiveRoiPercantage: "0.5",
              PurchasedPackageName: "wegwe",
              Date: `${getYear}-${getMonth}-${getDay}`
            }).save()

            // console.log(giveReward)



          }
  
          // console.log("////////////////////////////////")
          // console.log( findUser._id)
          // console.log("////////////////////////////////")
  
            const GetShortRecord1 = await ShortRecord.findOne({RecordOwner: findUser._id})

            // console.log(GetShortRecord1)
  
            if (GetShortRecord1 == null) {
              // console.log("cames ====>")
              
              const createNewRecord = await ShortRecord({
                RecordOwner:findUser._id,
                AllTimeDailyBusiness:Number(percan)
              }).save()
              
            }else{
              // console.log("cames2d ====>")
              
              const getValueThen2 = await ShortRecord.findOne({RecordOwner: findUser._id})
  
              let sumiTuPs = Number(getValueThen2.AllTimeDailyBusiness) + Number(percan)
  
  
              // console.log("the simeis =>>>>> "+sumiTuPs)
  
              const updateValue = await ShortRecord.findByIdAndUpdate({_id:getValueThen2._id},{AllTimeDailyBusiness:sumiTuPs})
              
              // console.log("gones also ====>")
            }
  
  
  
  
  
  
            // }
  
            num = num + 1
           
                       // Level income starting from here
  
  
            // Level Logic Is Here
  
          
  
            const MyUpperlinesPeople = await MyUpperline.find({ MyUserid: findUser._id });
  
  
            for (let indexDown = 0; indexDown < MyUpperlinesPeople.length; indexDown++) {
  
             const element = MyUpperlinesPeople[indexDown]
             var myLevels = JSON.parse(element.MyUpperLines)
            //  console.log(myLevels)
  
  
             for (let insideLevelUserIndex = 0; insideLevelUserIndex < myLevels.length; insideLevelUserIndex++) {
  
               const thisUser = myLevels[insideLevelUserIndex];
  
                const findMyUpperLineWholeData = await User.find({WalletAddress:thisUser})
                
              
                if (findMyUpperLineWholeData.length > 0) {
                  
                  // console.log(findMyUpperLineWholeData)
  
  
                  const findThisUserDiectReferals = await User.find({UpperLineSponserUser:findMyUpperLineWholeData[0].WalletAddress})
  
  
                  // console.log("myuser lengh is => "+  findThisUserDiectReferals.length)  // <===< here calculating all my direct referrals
  
                  
  
           
                  var news = 1+Number(insideLevelUserIndex)
  
                  // console.log("current level loop => "+  news)
  
                  if (findThisUserDiectReferals.length >= news) {
  
              
                    
  
  
  
  
                  var fndUser = await User.findById(findMyUpperLineWholeData[0]._id)
                  var findDirectsForThisUser = await User.find({UpperLineSponserUser:fndUser.WalletAddress})
  
                    var recNumber = 0
  
  
                    findDirectsForThisUser.map((hit,index)=>{
  
                      // console.log("tumhara hai ==>"+hit._id)
                      // console.log("mera hai ==>"+findUser._id)
  
                      // console.log(String(findUser._id))
  
                      if (hit._id == String(findUser._id)) {
                        // console.log("ye kam karing")
                        recNumber = index+1
                      }else{
                        // console.log("not karing")
                      }
  
  
  
                    })
  
  
                    var percen = 0
  
                    if (1+Number(insideLevelUserIndex) == 1) {
                      if (findDirectsForThisUser.length > 50) {
                        percen = 50
                      }else{
                        percen = 20
                      }
                    } else if (1+Number(insideLevelUserIndex) == 2) {
                      percen = 8
  
                    } else if (1+Number(insideLevelUserIndex) == 3) {
                      percen = 5
  
                    } else if (1+Number(insideLevelUserIndex) == 4) {
                      percen = 2.5
  
                    } else if (1+Number(insideLevelUserIndex) == 5) {
  
                      percen = 2
                    } else if (1+Number(insideLevelUserIndex) >= 6 && 1+Number(insideLevelUserIndex) <= 10) {
                      percen = 1.5
  
                    }else if(1+Number(insideLevelUserIndex) >= 11 && 1+Number(insideLevelUserIndex) <= 15){
                      percan = 1
                    }
  
  
  
                    var sum = Number(findMyUpperLineWholeData[0].Wallete) + Number(percan) * percen / 100
  
                    // console.log(sum)
  
                    await User.findByIdAndUpdate({ _id: findMyUpperLineWholeData[0]._id }, { Wallete: sum })

  
  
                    var indoxs = 1+Number(insideLevelUserIndex)
                  
                    if ( Number(indoxs)  <= Number(findDirectsForThisUser.length) ) {


                      ////// Checking 300%



                      const getPackage = await DepositRecord.find({ RecordOwner: findMyUpperLineWholeData[0]._id })


                      var totalStakedAmount = 0
                  
                      getPackage.map((hit) => {
                        return totalStakedAmount = totalStakedAmount + Number(hit.DepositAmount)
                      })
                  
                  
                      var AmountPercantages = totalStakedAmount * 300 / 100
                  
                  
                      const getShortDatForTotalEarnig = await ShortRecord.findOne({RecordOwner:findMyUpperLineWholeData[0]._id})
                  
                  
                      if (getShortDatForTotalEarnig) {
                  
                        let DailyEarnings = getShortDatForTotalEarnig.AllTimeDailyBusiness
                        let CareerEarnings = getShortDatForTotalEarnig.AllTimeCareerReward
                        let LevelEarnings = getShortDatForTotalEarnig.AllTimeLevelBusiness
                  
                        var sumss = DailyEarnings + CareerEarnings +LevelEarnings
                      }else{
                        var sumss = 0
                  
                      }
                  
                  
                  
                  
                  









                      ///// Till Here DOne


                      if (Number(sumss) < Number(AmountPercantages)) {


                        
                        
                        
                     const letsSeeLevel = await LevelDailyRoi({
                          
                          ROIOwner: findMyUpperLineWholeData[0]._id,
                          LevelEarned: 1+Number(insideLevelUserIndex),
                          coinEarned: Number(percan) * percen / 100,
                          EarnedPercantage: percen,
                          rewardGetFrom: findUser._id,
                          rewardGetFromName: findUser.WalletAddress,
                          
                        }).save()
                        
                        console.log(letsSeeLevel)
                        const GetShortRecord = await ShortRecord.findOne({RecordOwner: findMyUpperLineWholeData[0]._id})
    
    
                    if (GetShortRecord == null) {
    
    
                    
                      
                      
                      const createNewRecord = await ShortRecord({
                        RecordOwner:findMyUpperLineWholeData[0]._id,
                        AllTimeLevelBusiness:Number(percan) * percen / 100
                      }).save()
    
                      
                      
                    }else{
                      // console.log("came here for the lebel")
                      const getValueThen = await ShortRecord.findOne({RecordOwner: findMyUpperLineWholeData[0]._id})
  
                      
                      let sumiTuP = Number(getValueThen.AllTimeLevelBusiness) + Number(percan) * percen / 100
                      
                      // console.log("the sum is => "+sumiTuP)
  
  
    
                      const updateValue = await ShortRecord.findByIdAndUpdate({_id:getValueThen._id},{AllTimeLevelBusiness:sumiTuP})
    
                    }
                      }
                      


                      
                      
  
                }
                }
  
  
                }
              
             }
  
              
            }
  
          } else {

            // console.log("i am comming this this block =====================>")
            var percan = depositedAmount * 0.5 / 100
            const giveReward = await DailyRoi({
              RoiOwner: findUser._id,
              StepsWalked: "0",
              GiveRoiCoin: percan,
              GiveRoiPercantage: "0.5",
              PurchasedPackageName: "wegwe",
              Date: `${getYear}-${getMonth}-${getDay}`
            }).save()
  
  
            
            const GetShortRecord1 = await ShortRecord.findOne({RecordOwner: findUser._id})
  
  
            if (GetShortRecord1 == null) {
  
  
              const createNewRecord = await ShortRecord({
                RecordOwner:findUser._id,
                AllTimeDailyBusiness:percan
              }).save()
  
  
              // console.log("came in this if  3")
              
            }else{
  
              // console.log("came in this elase 5")
  
              const getValueThen5 = await ShortRecord.findOne({RecordOwner: findUser._id})
  
              let sumiTuP = getValueThen5.AllTimeDailyBusiness + Number(percan)
  
              const updateValue = await ShortRecord.findByIdAndUpdate({_id:getValueThen5._id},{AllTimeDailyBusiness:sumiTuP})
  
            }
  
  
  
  
  
  
  
           // Level income starting from here
  
  
            // Level Logic Is Here
  
          
  
            const MyUpperlinesPeople = await MyUpperline.find({ MyUserid: findUser._id });
  
  
            for (let indexDown = 0; indexDown < MyUpperlinesPeople.length; indexDown++) {
  
             const element = MyUpperlinesPeople[indexDown]
             var myLevels = JSON.parse(element.MyUpperLines)
            //  console.log(myLevels)
  
  
             for (let insideLevelUserIndex = 0; insideLevelUserIndex < myLevels.length; insideLevelUserIndex++) {
  
               const thisUser = myLevels[insideLevelUserIndex];
  
                const findMyUpperLineWholeData = await User.find({WalletAddress:thisUser})
                
              
                if (findMyUpperLineWholeData.length > 0) {
  
                  
                  
                  // console.log(findMyUpperLineWholeData)
  
  
                  const findThisUserDiectReferals = await User.find({UpperLineSponserUser:findMyUpperLineWholeData[0].WalletAddress})
  
  
                  // console.log("myuser lengh is => "+  findThisUserDiectReferals.length)  // <===< here calculating all my direct referrals
  
  
                  var news = 1+Number(insideLevelUserIndex)
  
                  // console.log("current level loop => "+  news)
  
                  if (findThisUserDiectReferals.length >= news) {
  
              
                    
  
  
  
                  var fndUser = await User.findById(findMyUpperLineWholeData[0]._id)
                  var findDirectsForThisUser = await User.find({UpperLineSponserUser:fndUser.WalletAddress})
  
  
                    var recNumber = 0
  
  
                    findDirectsForThisUser.map((hit,index)=>{
  
                      // console.log("tumhara hai ==>"+hit._id)
                      // console.log("mera hai ==>"+findUser._id)
  
                      // console.log(String(findUser._id))
  
                      if (hit._id == String(findUser._id)) {
                        // console.log("ye kam karing")
                        recNumber = index+1
                      }else{
                        // console.log("not karing")
                      }
  
  
  
                    })
                    
                  
                  var percen = 0
  
                  if (1+Number(insideLevelUserIndex) == 1) {
  
                    if (findDirectsForThisUser.length > 50) {
                      percen = 50
                    }else{
                      percen = 20
                    }
                  } else if (1+Number(insideLevelUserIndex) == 2) {
                    percen = 8
  
                  } else if (1+Number(insideLevelUserIndex) == 3) {
                    percen = 5
  
                  } else if (1+Number(insideLevelUserIndex) == 4) {
                    percen = 2.5
  
                  } else if (1+Number(insideLevelUserIndex) == 5) {
  
                    percen = 2
                  } else if (1+Number(insideLevelUserIndex) >= 6 && 1+Number(insideLevelUserIndex) <= 10) {
                    percen = 1.5
  
                  }else if(1+Number(insideLevelUserIndex) >= 11 && 1+Number(insideLevelUserIndex) <= 15){
                    percan = 1
                  }
  
                  var sum = Number(findMyUpperLineWholeData[0].Wallete) + Number(percan) * percen / 100
  
                  // console.log(sum)
                  
  
  
                  await User.findByIdAndUpdate({ _id: findMyUpperLineWholeData[0]._id }, { Wallete: sum })
  
  
  
  
                    var indoxs = 1+Number(insideLevelUserIndex)
  
  
                  
                    if ( Number(indoxs)  <= Number(findDirectsForThisUser.length) ) {



                                            ////// Checking 300%



                                            const getPackage = await DepositRecord.find({ RecordOwner: findMyUpperLineWholeData[0]._id })


                                            var totalStakedAmount = 0
                                        
                                            getPackage.map((hit) => {
                                              return totalStakedAmount = totalStakedAmount + Number(hit.DepositAmount)
                                            })
                                        
                                        
                                            var AmountPercantages = totalStakedAmount * 300 / 100
                                        
                                        
                                            const getShortDatForTotalEarnig = await ShortRecord.findOne({RecordOwner:findMyUpperLineWholeData[0]._id})
                                        
                                        
                                            if (getShortDatForTotalEarnig) {
                                        
                                              let DailyEarnings = getShortDatForTotalEarnig.AllTimeDailyBusiness
                                              let CareerEarnings = getShortDatForTotalEarnig.AllTimeCareerReward
                                              let LevelEarnings = getShortDatForTotalEarnig.AllTimeLevelBusiness
                                        
                                              var sumss = DailyEarnings + CareerEarnings +LevelEarnings
                                            }else{
                                              var sumss = 0
                                        
                                            }
                                        
                                        
                                        
                                        
                                        
                      
                      
                      
                      
                      
                      
                      
                      
                      
                                            ///// Till Here DOne




  
  
  
                      if (Number(sumss) < Number(AmountPercantages)) {
                      


                        
                        
                    
                                      await LevelDailyRoi({
                    
                                        ROIOwner: findMyUpperLineWholeData[0]._id,
                                        LevelEarned: 1+Number(insideLevelUserIndex),
                                        coinEarned: Number(percan) * percen / 100,
                                        EarnedPercantage: percen,
                                        rewardGetFrom: findUser._id,
                                        rewardGetFromName: findUser.WalletAddress,
                    
                                      }).save()
  
                                    }
                   
  
                                      
                                      const GetShortRecord = await ShortRecord.findOne({RecordOwner: findMyUpperLineWholeData[0]._id})
  
  
                                      if (GetShortRecord == null) {
  
                                        const createNewRecord = await ShortRecord({
                                          RecordOwner:findMyUpperLineWholeData[0]._id,
                                          AllTimeLevelBusiness:Number(percan) * percen / 100
                                        }).save()
                                        
                                      }else{
  
                                        const getValueThen = await ShortRecord.findOne({RecordOwner: findMyUpperLineWholeData[0]._id})
  
                                        let sumiTuP = Number(getValueThen.AllTimeLevelBusiness) + Number(percan) * percen / 100
  
                                        const updateValue = await ShortRecord.findByIdAndUpdate({_id:getValueThen._id},{AllTimeLevelBusiness:sumiTuP})
  
                                      }
  
  
  
  
     
                  }
  
  
                } 
                }
             } 
            }
          }
  
  
  
          
  
  
  
  
  
        }
  
      }


    }


    



  }

































  return res.status(200).json({
    success: true,
    data: {
      status: "Cron triggered successfully!!"
    }
  });
}
