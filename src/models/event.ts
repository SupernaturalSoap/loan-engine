import rule from './rule';

export default interface event {
    name: string,
    description: string,
    rules: rule,
    createdAt?: string,
    updatedAt?: string
}