export declare class TimePoint {
    hours: number;
    minutes: number;
    private invalid;
    private constructor();
    isInvalid(): boolean;
    valueOf(): number;
    toString(): string;
    toJSON(): string;
    getMinutesAmount(): number;
    addHours(hours: number): TimePoint;
    minusHours(hours: number): TimePoint;
    addMinutes(minutes: number): TimePoint;
    minusMinutes(minutes: number): TimePoint;
    sub(time: TimePoint): number;
    atTimeOf(date: Date): Date;
    static create(hours: number, minutes: number): TimePoint;
    static create(minutes: number): TimePoint;
    static create(value: string): TimePoint;
}
