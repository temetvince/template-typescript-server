import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function command(): Promise<string> {
   try {
      const { stdout } = await execAsync('dir');
      return stdout;
   } catch (error) {
      console.error(error);
      return '';
   }
}
