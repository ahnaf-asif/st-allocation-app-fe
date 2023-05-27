import { stRoutinePeriod } from '@/Shared/Constants';
export const getPeriodString = (period: string) => {
  const obj = stRoutinePeriod.find((p: any) => p.value === period);
  return obj?.label;
};

const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'];

export const getProcessedRoutine = (allRooms: any[]) => {
  return [
    {
      day: 'saturday',
      period_1: allRooms.map((room) => ({
        room: room.name,
        users: room.saturdayRoutine.filter((routine: any) => routine.saturdayPeriod === 'period_1')
      })),
      period_2: allRooms.map((room) => ({
        room: room.name,
        users: room.saturdayRoutine.filter((routine: any) => routine.saturdayPeriod === 'period_2')
      })),
      period_3: allRooms.map((room) => ({
        room: room.name,
        users: room.saturdayRoutine.filter((routine: any) => routine.saturdayPeriod === 'period_3')
      })),
      period_4: allRooms.map((room) => ({
        room: room.name,
        users: room.saturdayRoutine.filter((routine: any) => routine.saturdayPeriod === 'period_4')
      })),
      period_5: allRooms.map((room) => ({
        room: room.name,
        users: room.saturdayRoutine.filter((routine: any) => routine.saturdayPeriod === 'period_5')
      })),
      period_6: allRooms.map((room) => ({
        room: room.name,
        users: room.saturdayRoutine.filter((routine: any) => routine.saturdayPeriod === 'period_6')
      }))
    },

    {
      day: 'sunday',
      period_1: allRooms.map((room) => ({
        room: room.name,
        users: room.sundayRoutine.filter((routine: any) => routine.sundayPeriod === 'period_1')
      })),
      period_2: allRooms.map((room) => ({
        room: room.name,
        users: room.sundayRoutine.filter((routine: any) => routine.sundayPeriod === 'period_2')
      })),
      period_3: allRooms.map((room) => ({
        room: room.name,
        users: room.sundayRoutine.filter((routine: any) => routine.sundayPeriod === 'period_3')
      })),
      period_4: allRooms.map((room) => ({
        room: room.name,
        users: room.sundayRoutine.filter((routine: any) => routine.sundayPeriod === 'period_4')
      })),
      period_5: allRooms.map((room) => ({
        room: room.name,
        users: room.sundayRoutine.filter((routine: any) => routine.sundayPeriod === 'period_5')
      })),
      period_6: allRooms.map((room) => ({
        room: room.name,
        users: room.sundayRoutine.filter((routine: any) => routine.sundayPeriod === 'period_6')
      }))
    },
    {
      day: 'monday',
      period_1: allRooms.map((room) => ({
        room: room.name,
        users: room.mondayRoutine.filter((routine: any) => routine.mondayPeriod === 'period_1')
      })),
      period_2: allRooms.map((room) => ({
        room: room.name,
        users: room.mondayRoutine.filter((routine: any) => routine.mondayPeriod === 'period_2')
      })),
      period_3: allRooms.map((room) => ({
        room: room.name,
        users: room.mondayRoutine.filter((routine: any) => routine.mondayPeriod === 'period_3')
      })),
      period_4: allRooms.map((room) => ({
        room: room.name,
        users: room.mondayRoutine.filter((routine: any) => routine.mondayPeriod === 'period_4')
      })),
      period_5: allRooms.map((room) => ({
        room: room.name,
        users: room.mondayRoutine.filter((routine: any) => routine.mondayPeriod === 'period_5')
      })),
      period_6: allRooms.map((room) => ({
        room: room.name,
        users: room.mondayRoutine.filter((routine: any) => routine.mondayPeriod === 'period_6')
      }))
    },
    {
      day: 'tuesday',
      period_1: allRooms.map((room) => ({
        room: room.name,
        users: room.tuesdayRoutine.filter((routine: any) => routine.tuesdayPeriod === 'period_1')
      })),
      period_2: allRooms.map((room) => ({
        room: room.name,
        users: room.tuesdayRoutine.filter((routine: any) => routine.tuesdayPeriod === 'period_2')
      })),
      period_3: allRooms.map((room) => ({
        room: room.name,
        users: room.tuesdayRoutine.filter((routine: any) => routine.tuesdayPeriod === 'period_3')
      })),
      period_4: allRooms.map((room) => ({
        room: room.name,
        users: room.tuesdayRoutine.filter((routine: any) => routine.tuesdayPeriod === 'period_4')
      })),
      period_5: allRooms.map((room) => ({
        room: room.name,
        users: room.tuesdayRoutine.filter((routine: any) => routine.tuesdayPeriod === 'period_5')
      })),
      period_6: allRooms.map((room) => ({
        room: room.name,
        users: room.tuesdayRoutine.filter((routine: any) => routine.tuesdayPeriod === 'period_6')
      }))
    },
    {
      day: 'wednesday',
      period_1: allRooms.map((room) => ({
        room: room.name,
        users: room.wednesdayRoutine.filter(
          (routine: any) => routine.wednesdayPeriod === 'period_1'
        )
      })),
      period_2: allRooms.map((room) => ({
        room: room.name,
        users: room.wednesdayRoutine.filter(
          (routine: any) => routine.wednesdayPeriod === 'period_2'
        )
      })),
      period_3: allRooms.map((room) => ({
        room: room.name,
        users: room.wednesdayRoutine.filter(
          (routine: any) => routine.wednesdayPeriod === 'period_3'
        )
      })),
      period_4: allRooms.map((room) => ({
        room: room.name,
        users: room.wednesdayRoutine.filter(
          (routine: any) => routine.wednesdayPeriod === 'period_4'
        )
      })),
      period_5: allRooms.map((room) => ({
        room: room.name,
        users: room.wednesdayRoutine.filter(
          (routine: any) => routine.wednesdayPeriod === 'period_5'
        )
      })),
      period_6: allRooms.map((room) => ({
        room: room.name,
        users: room.wednesdayRoutine.filter(
          (routine: any) => routine.wednesdayPeriod === 'period_6'
        )
      }))
    },
    {
      day: 'thursday',
      period_1: allRooms.map((room) => ({
        room: room.name,
        users: room.thursdayRoutine.filter((routine: any) => routine.thursdayPeriod === 'period_1')
      })),
      period_2: allRooms.map((room) => ({
        room: room.name,
        users: room.thursdayRoutine.filter((routine: any) => routine.thursdayPeriod === 'period_2')
      })),
      period_3: allRooms.map((room) => ({
        room: room.name,
        users: room.thursdayRoutine.filter((routine: any) => routine.thursdayPeriod === 'period_3')
      })),
      period_4: allRooms.map((room) => ({
        room: room.name,
        users: room.thursdayRoutine.filter((routine: any) => routine.thursdayPeriod === 'period_4')
      })),
      period_5: allRooms.map((room) => ({
        room: room.name,
        users: room.thursdayRoutine.filter((routine: any) => routine.thursdayPeriod === 'period_5')
      })),
      period_6: allRooms.map((room) => ({
        room: room.name,
        users: room.thursdayRoutine.filter((routine: any) => routine.thursdayPeriod === 'period_6')
      })),
      any: allRooms.map((room) => ({
        room: room.name,
        users: room.thursdayRoutine.filter((routine: any) => routine.thursdayPeriod === 'any')
      }))
    }
  ];
};
