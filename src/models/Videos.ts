export class Videos {
     
    constructor(
        private id:string,
        private title: string,
        private duration: number,
        private upload_at: string,
        ) {}
      
        /**
         * getId - pegar um o id do objeto
         */
        public getId():string {
            return this.id 
        }

        /**
         * setId() - método public seguro para alterar id do objeto
         */
        public setId(value:string):void {
            this.id = value
        }

        public getTitle(): string {
            return this.title
        }
        public setTitle(value: string):void {
            this.title = value
        }
        public getUploadAt(): string {
            return this.upload_at
        }
        public setUpload_at(value: string):void {
            this.upload_at = value
        }
        public getDuration(): number {
            return this.duration
        }
        public setDuration(value: number):void {
            this.duration = value
        }

     }